'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function PaySuccessError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
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
        <Button onClick={() => window.location.href = '/'} variant="outline">
          {t('home')}
        </Button>
      </div>
    </div>
  );
}
