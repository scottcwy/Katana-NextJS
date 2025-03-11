'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ConsoleLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    // u8bb0u5f55u9519u8befu5230u9519u8befu62a5u544au670du52a1
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {t('message')}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          {t('retry')}
        </Button>
        <Button 
          onClick={() => {
            // 从URL路径中获取当前locale
            const pathParts = window.location.pathname.split('/');
            const locale = pathParts[1] || 'en'; // 默认英语
            window.location.href = `/${locale}`;
          }} 
          variant="outline"
        >
          {t('home')}
        </Button>
      </div>
    </div>
  );
}
