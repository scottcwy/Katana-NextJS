import { getTranslations as getNextIntlTranslations } from 'next-intl/server';

/**
 * 获取翻译函数，用于服务器端API路由
 * @param locale 语言代码
 * @returns 翻译函数
 */
export async function getTranslations(locale: string) {
  // 默认使用英文
  const finalLocale = locale || 'en';
  
  // 获取翻译函数
  const messages = await import(`./messages/${finalLocale}.json`);
  
  // 简单包装翻译函数，处理无翻译键的情况
  return function translate(key: string, params?: Record<string, any>) {
    try {
      // 分割键路径
      const parts = key.split('.');
      let current: any = messages;
      
      // 遍历路径查找翻译
      for (const part of parts) {
        if (current[part] === undefined) {
          // 如果翻译不存在，返回键名
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        current = current[part];
      }
      
      // 如果有参数，进行简单替换
      if (params && typeof current === 'string') {
        return Object.entries(params).reduce((result, [key, value]) => {
          return result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
        }, current);
      }
      
      return current;
    } catch (error) {
      console.error(`Error in translation for key: ${key}`, error);
      return key;
    }
  };
}
