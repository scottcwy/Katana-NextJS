'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">404</h2>
      <h3 className="text-xl font-semibold mb-2">u9875u9762u672au627eu5230</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        u5f88u62b1u6b49uff0cu60a8u8bbfu95eeu7684u9875u9762u4e0du5b58u5728u6216u5df2u88abu79fbu9664u3002
      </p>
      <Button 
        onClick={() => {
          // 使用浏览器语言或默认语言
          const locale = navigator.language.split('-')[0] || 'en';
          window.location.href = `/${locale}`;
        }}
        variant="default"
      >
        返回首页
      </Button>
    </div>
  );
}
