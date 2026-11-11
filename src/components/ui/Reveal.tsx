import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div className={cn("reveal", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
