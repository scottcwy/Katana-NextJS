'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">出现了严重问题</h2>
          <p className="mb-6 text-gray-600">
            很抱歉，我们遇到了一个严重错误。请尝试刷新页面或返回首页。
          </p>
          <div className="flex gap-4">
            <Button onClick={() => reset()} variant="default">
              重试
            </Button>
            <Button 
              onClick={() => {
                const locale = navigator.language.split('-')[0] || 'en';
                window.location.href = `/${locale}`;
              }} 
              variant="outline"
            >
              返回首页
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
