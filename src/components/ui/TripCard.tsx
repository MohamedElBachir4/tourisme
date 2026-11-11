import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Clock3 } from "lucide-react";
import type { TripCopy } from "@/types";

type TripCardProps = {
  href: string;
  image: string;
  position: string;
  copy: TripCopy;
  duration: string;
  price: string;
  viewLabel: string;
};

export function TripCard({
  href,
  image,
  position,
  copy,
  duration,
  price,
  viewLabel,
}: TripCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-forest/10 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={copy.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
          style={{ objectPosition: position }}
        />
        <p className="absolute start-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-xs font-medium text-forest">
          {copy.category}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-medium tracking-tight text-forest">
          {copy.title}
        </h3>
        <ul className="mt-4 space-y-2.5 text-sm text-charcoal/75">
          <li className="flex items-center gap-2.5">
            <Clock3 className="size-4 shrink-0 text-pine" aria-hidden />
            {duration}
          </li>
          <li className="flex items-center gap-2.5">
            <BedDouble className="size-4 shrink-0 text-pine" aria-hidden />
            {copy.accommodation}
          </li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="text-sm font-medium text-forest">{price}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pine transition-colors hover:text-forest"
          >
            {viewLabel}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </article>
  );
}
