import { notFound } from 'next/navigation';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Wallpaper Generator',
  description: 'Generate beautiful AI wallpapers with a simple prompt',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  // 列出所有支持的语言
  const locales = ['en', 'zh'];
  
  // 验证URL中的语言参数
  // 这个检查是为了确保用户不能通过手动输入URL访问不支持的语言
  const isValidLocale = !params?.locale || locales.some((cur) => cur === params.locale);
  if (!isValidLocale) {
    notFound();
  }

  return (
    <html lang={params.locale || 'en'} className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
