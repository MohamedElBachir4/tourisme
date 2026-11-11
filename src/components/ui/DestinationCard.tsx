import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { DestinationCopy } from "@/types";

type DestinationCardProps = {
  href: string;
  image: string;
  position: string;
  className: string;
  copy: DestinationCopy;
  exploreLabel: string;
};

export function DestinationCard({
  href,
  image,
  position,
  className,
  copy,
  exploreLabel,
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex overflow-hidden rounded-[1.75rem] bg-charcoal ${className}`}
    >
      <Image
        src={image}
        alt={copy.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/10" />
      <div className="relative z-10 mt-auto flex w-full flex-col p-6 text-ivory sm:p-8">
        <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-ivory/15 px-3 py-1 text-xs tracking-wide text-ivory backdrop-blur-sm">
          <MapPin className="size-3.5" aria-hidden />
          {copy.location}
        </p>
        <h3 className="font-display text-3xl font-medium tracking-tight">{copy.name}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/85 sm:text-base">
          {copy.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage">
          {exploreLabel}
          <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
