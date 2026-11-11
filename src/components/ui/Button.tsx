import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-pine text-ivory hover:bg-forest",
  secondary:
    "border border-forest/15 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  light: "bg-ivory text-forest hover:bg-white",
  ghost: "border border-ivory/45 bg-charcoal/15 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-forest",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-300",
    variants[variant],
    className,
  );

  if (href) {
    if (href.includes("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
