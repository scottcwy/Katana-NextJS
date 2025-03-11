import { ImageModel } from '../interface';
import { ImageModelOptions, ImageModelWarning } from '../types';
import { checkCredits, consumeCredits, OperationType } from '@/services/credit';

interface FluxAPIResponse {
  images: Array<{
    url: string;
    b64_json?: string;
  }>;
  timings?: {
    total_time: number;
  };
  seed?: number;
}

export class FluxImageProvider implements ImageModel {
  readonly provider = 'flux';
  readonly modelId = 'black-forest-labs/FLUX.1-dev';  // 更新为 FLUX.1-dev 模型
  readonly maxImagesPerCall = 1;
  readonly creditsPerImage = 10;

  private readonly apiKey: string;
  private readonly apiEndpoint = 'https://api.siliconflow.cn/v1/images/generations';

  constructor() {
    this.apiKey = process.env.FLUX_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('Flux API Token 缺失');
    }
  }

  async doGenerate(options: ImageModelOptions): Promise<{
    images: Array<string>;
    warnings: Array<ImageModelWarning>;
  }> {
    // 使用积分检查函数
    await checkCredits(options.user_uuid, OperationType.IMAGE_GENERATION, this.provider);

    try {
      console.log('Calling Flux API with options:', {
        model: this.modelId,
        prompt: options.prompt,
        size: options.size
      });

      // 调用硅基流动 API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.modelId,
          prompt: options.prompt,
          seed: Math.floor(Math.random() * 9999999999),
          width: options.size?.width || 1024,  // FLUX.1-dev 支持更高分辨率
          height: options.size?.height || 1024,
          num_images: 1,
          steps: 30,
          cfg_scale: 7.5,
          style_preset: "photographic",
          negative_prompt: "ugly, blurry, low quality, distorted, disfigured"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API 调用失败: ${response.statusText}. Details: ${errorText}`);
      }

      const result = await response.json() as FluxAPIResponse;
      console.log('Flux API Response:', result);

      // 使用积分扣除函数
      await consumeCredits(options.user_uuid, OperationType.IMAGE_GENERATION, this.provider);

      // 从响应中提取图片 URL
      const imageUrls = result.images.map(img => img.url);

      return {
        images: imageUrls,
        warnings: []
      };
    } catch (error: any) {
      console.error('Image generation error:', error);
      throw new Error(`图片生成失败: ${error.message}`);
    }
  }
}
