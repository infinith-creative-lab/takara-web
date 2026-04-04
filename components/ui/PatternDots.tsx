// components/ui/PatternDots.tsx
// Reusable SVG dot pattern component for decorative backgrounds.
import { cn } from "@/lib/utils";

interface PatternDotsProps {
  className?: string;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
}

export default function PatternDots({
  className,
  width = 24,
  height = 24,
  radius = 2,
  fill = "currentColor",
}: PatternDotsProps) {
  return (
    <svg className={cn("pointer-events-none absolute", className)} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern
          id="dots-pattern"
          x="0"
          y="0"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={radius} cy={radius} r={radius} fill={fill} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  );
}
