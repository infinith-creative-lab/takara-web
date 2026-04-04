import { HeroSkeleton, SectionHeaderSkeleton } from "@/components/skeletons/SectionSkeletons";
import { StatsSkeleton } from "@/components/skeletons/CardSkeletons";

export default function Loading() {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <HeroSkeleton />
      
      {/* Stats bar area placeholder */}
      <div className="container-site -mt-16 relative z-20">
        <StatsSkeleton />
      </div>

      <section className="py-24 lg:py-32">
        <div className="container-site">
          <SectionHeaderSkeleton centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 animate-pulse bg-neutral-200" />
                </div>
                <div className="flex flex-col gap-2 p-2">
                   <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse" />
                   <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
