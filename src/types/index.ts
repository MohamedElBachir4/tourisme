export type Locale = "en" | "fr" | "ar";

export type Direction = "ltr" | "rtl";

export type FeatureCopy = {
  title: string;
  description: string;
};

export type DestinationId = "ghardaia" | "tassili" | "djurdjura" | "taghit";

export type DestinationCopy = {
  name: string;
  description: string;
  location: string;
  alt: string;
};

export type TripId = "mzab" | "tassili" | "djurdjura";

export type TripCopy = {
  title: string;
  accommodation: string;
  category: string;
  alt: string;
};

export type StepCopy = {
  title: string;
  description: string;
};

export type ModeCopy = {
  title: string;
  description: string;
};

export type ImpactCopy = {
  title: string;
  description: string;
  alt: string;
};

export type Dictionary = {
  nav: {
    primary: string;
    home: string;
    about: string;
    destinations: string;
    plan: string;
    carbon: string;
    explore: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    skip: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
    alt: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    features: [FeatureCopy, FeatureCopy, FeatureCopy];
  };
  destinations: {
    eyebrow: string;
    title: string;
    description: string;
    explore: string;
    items: Record<DestinationId, DestinationCopy>;
  };
  trips: {
    eyebrow: string;
    title: string;
    description: string;
    view: string;
    from: string;
    currency: string;
    days: string;
    items: Record<TripId, TripCopy>;
  };
  planner: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    alt: string;
    steps: [StepCopy, StepCopy, StepCopy];
  };
  carbon: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    note: string;
    modes: [ModeCopy, ModeCopy, ModeCopy, ModeCopy];
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    items: [ImpactCopy, ImpactCopy, ImpactCopy];
  };
  finalCta: {
    titleLead: string;
    titleAccent: string;
    description: string;
    cta: string;
    alt: string;
  };
  footer: {
    description: string;
    explore: string;
    prepare: string;
    places: string;
    contact: string;
    rights: string;
    photos: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    address: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
  placeholder: {
    eyebrow: string;
    title: string;
    description: string;
    back: string;
  };
};
