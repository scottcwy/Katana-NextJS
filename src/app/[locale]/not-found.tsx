import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function LocaleNotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">404</h2>
      <h3 className="text-xl font-semibold mb-2">{t('title')}</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {t('message')}
      </p>
      <Button asChild variant="default">
        <Link href="/">{t('home')}</Link>
      </Button>
    </div>
  );
}
