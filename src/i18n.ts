import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // 加载当前语言的消息
  const messages = (await import(`./i18n/messages/${locale}.json`)).default;

  return {
    messages,
  };
});
