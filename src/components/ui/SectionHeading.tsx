import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em]",
            light ? "text-sage" : "text-pine",
            align === "center" && "justify-center",
          )}
        >
          <span
            className={cn("h-px w-8", light ? "bg-sage/70" : "bg-pine")}
            aria-hidden
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-display text-4xl font-medium tracking-tight sm:text-5xl",
          light ? "text-ivory" : "text-forest",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-sage/95" : "text-charcoal/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
