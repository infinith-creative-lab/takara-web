import { cn } from "@/lib/utils";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "default" | "white";
}

export default function Logo({ variant = "default", className, ...props }: LogoProps) {
  return (
    <svg 
      width="105" 
      height="107" 
      viewBox="0 0 105 107" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-8 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <rect 
        y="50.5" 
        width="52" 
        height="56" 
        className={cn(
          "transition-colors duration-250",
          variant === "white" ? "fill-white/80" : "fill-[#2191D0]"
        )} 
      />
      <path 
        d="M105 91.5H61.5V41H20.5V0H105V91.5Z" 
        className={cn(
          "transition-colors duration-250",
          variant === "white" ? "fill-white" : "fill-[#0975B3]"
        )} 
      />
    </svg>
  );
}
