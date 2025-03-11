import { getTranslations } from 'next-intl/server';

// 响应状态码常量
const RESPONSE_STATUS = {
  SUCCESS: 0,
  ERROR: 1
};

export const respData = <T>(data: T) => {
  return Response.json({ code: RESPONSE_STATUS.SUCCESS, data });
};

export const respOk = () => {
  return Response.json({ code: RESPONSE_STATUS.SUCCESS, message: "ok" });
};

export async function respErr(messageKey: string, locale: string = 'en') {
  try {
    // 尝试获取翻译
    const t = await getTranslations({ locale, namespace: 'api.errors' });
    const translatedMessage = t(messageKey, { fallback: messageKey });
    
    return Response.json({ code: RESPONSE_STATUS.ERROR, message: translatedMessage });
  } catch (error) {
    // 如果翻译失败，返回原始消息
    console.error('Translation error:', error);
    return Response.json({ code: RESPONSE_STATUS.ERROR, message: messageKey });
  }
}
