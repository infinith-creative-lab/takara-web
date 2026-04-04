import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export function SectionHeaderSkeleton({ centered = false }: { centered?: boolean }) {
  return (
    <div className={cn("max-w-2xl mb-12", centered && "mx-auto text-center flex flex-col items-center")}>
      <Skeleton className="h-6 w-32 mb-4 rounded-full" />
      <Skeleton className="h-10 w-full sm:w-96 mb-4" />
      <Skeleton className="h-20 w-full sm:w-[500px]" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-hero pt-40 pb-24 lg:pt-48 lg:pb-32 min-h-[60vh] flex items-center">
      <div className="container-site">
        <Skeleton className="h-6 w-32 mb-6 bg-white/10 rounded-full" />
        <Skeleton className="h-16 md:h-24 w-full md:w-[600px] mb-6 bg-white/10" />
        <Skeleton className="h-20 w-full md:w-[500px] bg-white/10" />
      </div>
    </section>
  );
}
