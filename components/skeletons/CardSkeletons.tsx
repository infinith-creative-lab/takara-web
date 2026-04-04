import { Skeleton } from "@/components/ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="card flex flex-col md:flex-row overflow-hidden border border-neutral-100 min-h-[220px]">
      {/* Image skeleton */}
      <div className="w-full md:w-56 shrink-0 aspect-[4/3] md:aspect-auto">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      
      {/* Content skeleton */}
      <div className="flex flex-col p-6 flex-1 gap-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardVerticalSkeleton() {
  return (
    <div className="card flex flex-col overflow-hidden border border-neutral-100 min-h-[400px]">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] w-full shrink-0">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col p-6 flex-1 gap-4">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="mt-auto">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8 bg-white border-y border-neutral-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
