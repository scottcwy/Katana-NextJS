export type ImageModelOptions = {
  prompt: string;
  user_uuid: string;
  n?: number;
  size?: {
    width: number;
    height: number;
  };
  style?: string;
};

export type ImageModelWarning = {
  type: string;
  message: string;
};
