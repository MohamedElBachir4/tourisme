import { cn } from "@/lib/cn";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <label className={cn("block text-sm text-charcoal/80", className)}>
      <span className="mb-2 block font-medium text-forest">{label}</span>
      {children}
    </label>
  );
}

export const fieldClassName =
  "w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-forest outline-none ring-pine focus:ring-2";
