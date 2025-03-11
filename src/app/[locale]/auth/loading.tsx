import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-center mt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
