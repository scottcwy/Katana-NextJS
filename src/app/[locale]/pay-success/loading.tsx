import { Skeleton } from '@/components/ui/skeleton';

export default function PaySuccessLoading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <div className="flex justify-center mt-6">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
