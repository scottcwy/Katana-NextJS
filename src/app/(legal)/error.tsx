'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LegalLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // u8bb0u5f55u9519u8befu5230u9519u8befu62a5u544au670du52a1
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">u51fau73b0u4e86u4e00u4e9bu95eeu9898</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        u5f88u62b1u6b49uff0cu6211u4eecu9047u5230u4e86u4e00u4e2au9519u8befu3002u8bf7u5c1du8bd5u5237u65b0u9875u9762u6216u8fd4u56deu9996u9875u3002
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          u91cdu8bd5
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="outline">
          u8fd4u56deu9996u9875
        </Button>
      </div>
    </div>
  );
}
