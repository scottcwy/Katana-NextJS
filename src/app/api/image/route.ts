import { FluxImageProvider } from '@/providers/image/v1/implementations/flux';
import { NextResponse } from 'next/server';
import { addCreditsForTestUser } from '@/services/credit';
import { getIsoTimestr } from '@/lib/time';

export async function POST(request: Request) {
  try {
    const { prompt, user_uuid, size, locale } = await request.json();
    const acceptLanguage = request.headers.get('Accept-Language') || 'en-US';
    const clientLocale = locale || (acceptLanguage.startsWith('zh') ? 'zh' : 'en');
    
    // 加载对应语言的翻译文件
    const messages = (await import(`@/i18n/messages/${clientLocale}.json`)).default;
    // 简单实现翻译函数
    const t = (key: string) => {
      try {
        const parts = key.split('.');
        let result = messages;
        
        for (const part of parts) {
          result = result[part];
          if (result === undefined) return key;
        }
        
        return result;
      } catch (e) {
        return key;
      }
    };
    
    console.log('Received request:', { prompt, user_uuid, size, locale, acceptLanguage });
    
    // 验证提示词
    if (!prompt || prompt.trim() === '') {
      return NextResponse.json(
        { error: t('api.errors.no_prompt') },
        { status: 400 }
      );
    }
    
    // 验证图像尺寸
    if (!size || !size.width || !size.height) {
      return NextResponse.json(
        { error: t('api.errors.invalid_size') },
        { status: 400 }
      );
    }
    
    // 为测试用户添加积分 - 使用新的addCreditsForTestUser函数
    if (user_uuid === 'test-user') {
      await addCreditsForTestUser(user_uuid, 100);
    }

    // 根据语言环境调整提示词
    let finalPrompt = prompt;
    
    // 如果是英文环境，确保提示词是英文
    if (locale === 'en' || acceptLanguage.startsWith('en')) {
      // 如果提示词是中文，可以在这里添加翻译逻辑
      // 或者直接使用英文提示词
      console.log('Using English prompt:', finalPrompt);
    } else {
      console.log('Using Chinese prompt:', finalPrompt);
    }

    const provider = new FluxImageProvider();
    const result = await provider.doGenerate({
      prompt: finalPrompt,
      user_uuid,
      size
    });

    console.log('API result:', result);
    
    // 确保返回正确的数据结构
    return NextResponse.json({
      images: result.images,
      warnings: result.warnings
    });
  } catch (error: any) {
    console.error('API error:', error);
    const clientLocale = request.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en';
    
    // 加载对应语言的翻译文件
    const messages = (await import(`@/i18n/messages/${clientLocale}.json`)).default;
    // 简单实现翻译函数
    const t = (key: string) => {
      try {
        const parts = key.split('.');
        let result = messages;
        
        for (const part of parts) {
          result = result[part];
          if (result === undefined) return key;
        }
        
        return result;
      } catch (e) {
        return key;
      }
    };
    
    return NextResponse.json(
      { error: t('api.errors.image_generation') + ': ' + error.message },
      { status: 500 }
    );
  }
}
