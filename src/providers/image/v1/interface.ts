import { ImageModelOptions, ImageModelWarning } from "./types";

export interface ImageModel {
  readonly provider: string;
  readonly modelId: string;
  readonly maxImagesPerCall: number;
  readonly creditsPerImage: number;

  doGenerate(options: ImageModelOptions): Promise<{
    images: Array<string>;
    warnings: Array<ImageModelWarning>;
  }>;
}
