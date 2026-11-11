import { cn } from "@/lib/cn";

type LogoProps = {
  name: string;
  tagline: string;
  className?: string;
};

export function Logo({ name, tagline, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 36 36" className="size-9 shrink-0" aria-hidden>
        <circle cx="18" cy="18" r="16.25" fill="none" stroke="currentColor" strokeWidth="1.15" />
        <path
          d="M11 25.5V16.2c0-4 2.9-7.2 7-7.2s7 3.2 7 7.2v9.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M18 15.2c.15 1.7-.7 3-1.85 3.85 1.15.15 2.45.05 3.5-.7 1.05-.75 1.7-2 1.55-3.55-1.15.7-2.35.85-3.2.4Z"
          fill="currentColor"
        />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-medium tracking-[0.22em]">
          {name}
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.16em] opacity-75">
          {tagline}
        </span>
      </span>
    </span>
  );
}
