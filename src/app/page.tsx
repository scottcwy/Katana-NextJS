'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 获取浏览器语言
    const browserLang = navigator.language.split('-')[0];
    // 只接受我们支持的语言，否则使用默认英语
    const locale = ['en', 'zh'].includes(browserLang) ? browserLang : 'en';
    
    // 重定向到本地化主页
    router.replace(`/${locale}`);
  }, [router]);

  // 渲染一个简单的加载状态，很快会被重定向
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">加载中...</div>
    </div>
  );
}
