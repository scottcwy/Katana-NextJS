import { Skeleton } from '@/components/ui/skeleton';

export default function LegalLayoutLoading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-4xl space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4 justify-center mt-8">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
