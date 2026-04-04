import { HeroSkeleton, SectionHeaderSkeleton } from "@/components/skeletons/SectionSkeletons";
import { ProductCardSkeleton } from "@/components/skeletons/CardSkeletons";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <HeroSkeleton />
      
      <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
        <div className="container-site relative z-10">
          <SectionHeaderSkeleton centered />
          
          {/* Skeleton Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 rounded-full bg-neutral-100 animate-pulse border border-neutral-200" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
