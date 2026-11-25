import type { Locale } from "@/types";

export type PageCopy = {
  common: {
    backHome: string;
    loading: string;
    search: string;
    filterWilaya: string;
    allWilayas: string;
    noResults: string;
    bookNow: string;
    viewDetails: string;
    from: string;
    currency: string;
    days: string;
    nights: string;
    travelers: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    next: string;
    back: string;
    total: string;
    continueBooking: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
    valuesTitle: string;
    values: Array<{ title: string; description: string }>;
  };
  destinationsPage: {
    eyebrow: string;
    title: string;
    description: string;
    activities: string;
    lodging: string;
    relatedTrips: string;
    wilaya: string;
  };
  toursPage: {
    eyebrow: string;
    title: string;
    description: string;
    duration: string;
    destination: string;
    includes: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    successMessage: string;
  };
  plannerPage: {
    eyebrow: string;
    title: string;
    description: string;
    stepDestination: string;
    stepAccommodation: string;
    stepActivities: string;
    stepTransport: string;
    stepDetails: string;
    stepSummary: string;
    selectDestination: string;
    selectAccommodation: string;
    selectActivities: string;
    selectTransport: string;
    travelDate: string;
    travelDistance: string;
    carbonEstimate: string;
    summaryTitle: string;
    priceBreakdown: string;
    accommodationCost: string;
    activitiesCost: string;
    transportCost: string;
    confirmBooking: string;
  };
  carbonPage: {
    eyebrow: string;
    title: string;
    description: string;
    distance: string;
    transport: string;
    travelers: string;
    calculate: string;
    result: string;
    comparison: string;
    bestOption: string;
    education: string;
    estimateNote: string;
    savingsLabel: string;
    savingsVs: string;
    noLoginNeeded: string;
    unit: string;
    tipsTitle: string;
    tips: string[];
  };
  bookingPage: {
    eyebrow: string;
    title: string;
    description: string;
    fullName: string;
    phone: string;
    email: string;
    notes: string;
    tripSummary: string;
    carbonResult: string;
    surveyTitle: string;
    preferredTransport: string;
    preferredAccommodation: string;
    interestEco: string;
    awareness: string;
    yes: string;
    no: string;
    confirmationTitle: string;
    confirmationBody: string;
    reference: string;
  };
  admin: {
    loginTitle: string;
    email: string;
    password: string;
    signIn: string;
    signOut: string;
    overview: string;
    destinations: string;
    trips: string;
    accommodations: string;
    activities: string;
    transport: string;
    emissionFactors: string;
    bookings: string;
    surveys: string;
    messages: string;
    totalBookings: string;
    pending: string;
    confirmed: string;
    save: string;
    delete: string;
    create: string;
    edit: string;
    status: string;
  };
};

const en: PageCopy = {
  common: {
    backHome: "Back to homepage",
    loading: "Loading…",
    search: "Search",
    filterWilaya: "Wilaya",
    allWilayas: "All wilayas",
    noResults: "No results match your filters.",
    bookNow: "Request booking",
    viewDetails: "View details",
    from: "From",
    currency: "DZD",
    days: "{count} days",
    nights: "Nights",
    travelers: "Travelers",
    submit: "Submit",
    sending: "Sending…",
    success: "Saved successfully.",
    error: "Something went wrong. Please try again.",
    required: "Required",
    next: "Continue",
    back: "Back",
    total: "Estimated total",
    continueBooking: "Continue to booking",
  },
  about: {
    eyebrow: "About Sirius Trail",
    title: "Travel that protects the places we love",
    intro:
      "Sirius Trail is a sustainable tourism platform focused on Algeria. We connect travelers with destinations, hosts, and journeys that respect nature and local communities.",
    missionTitle: "Mission",
    mission:
      "Make responsible travel in Algeria clear, practical, and inspiring—so every journey can support people and landscapes.",
    visionTitle: "Vision",
    vision:
      "A tourism culture where discovery and environmental care move together, and where local communities remain at the center of the experience.",
    valuesTitle: "What guides us",
    values: [
      {
        title: "Protect nature",
        description: "Prefer routes, stays, and activities that respect ecosystems and marked paths.",
      },
      {
        title: "Support communities",
        description: "Highlight family hosts, cooperatives, and guides so more value stays local.",
      },
      {
        title: "Travel consciously",
        description: "Give travelers simple tools to compare impact and choose with intention.",
      },
    ],
  },
  destinationsPage: {
    eyebrow: "Destinations",
    title: "Sustainable places across Algeria",
    description: "Search and filter destinations by wilaya, then open a place to see activities, lodging, and trips.",
    activities: "Activities",
    lodging: "Accommodation",
    relatedTrips: "Available journeys",
    wilaya: "Wilaya",
  },
  toursPage: {
    eyebrow: "Eco-tours",
    title: "Journeys designed with care",
    description: "Browse packaged trips with duration, starting price, and a clear booking path.",
    duration: "Duration",
    destination: "Destination",
    includes: "Included experiences",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Write to the Sirius Trail team",
    description: "Questions about destinations, trips, or partnerships—send a message and we will respond.",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    successMessage: "Thank you. Your message has been received.",
  },
  plannerPage: {
    eyebrow: "Trip planner",
    title: "Build your journey step by step",
    description: "Choose a destination, stay, activities, and transport, then review an estimated price in DZD.",
    stepDestination: "Destination",
    stepAccommodation: "Accommodation",
    stepActivities: "Activities",
    stepTransport: "Transportation",
    stepDetails: "Trip details",
    stepSummary: "Summary",
    selectDestination: "Select a destination",
    selectAccommodation: "Select accommodation",
    selectActivities: "Select one or more activities",
    selectTransport: "Select transportation",
    travelDate: "Travel date",
    travelDistance: "Travel distance (km)",
    carbonEstimate: "Estimated carbon footprint",
    summaryTitle: "Your custom journey",
    priceBreakdown: "Price breakdown",
    accommodationCost: "Accommodation",
    activitiesCost: "Activities",
    transportCost: "Transportation",
    confirmBooking: "Confirm booking request",
  },
  carbonPage: {
    eyebrow: "Carbon calculator",
    title: "Estimate the footprint of your journey",
    description:
      "No account needed. Enter distance, choose a transport mode, and compare CO₂e estimates.",
    distance: "Distance (km)",
    transport: "Transportation",
    travelers: "Travelers",
    calculate: "Calculate footprint",
    result: "Estimated emissions",
    comparison: "Compare options",
    bestOption: "Most environmentally friendly for this trip",
    education:
      "These figures are estimates based on average emission factors stored in our database. Admins can update the factors at any time.",
    estimateNote:
      "Results are indicative only. Real emissions vary with vehicle type, electricity source for electric cars, and occupancy.",
    savingsLabel: "Environmental savings vs reference",
    savingsVs: "Compared with a private gasoline car for the same trip",
    noLoginNeeded: "Available to every visitor — no sign-up required.",
    unit: "kg CO2e",
    tipsTitle: "Ways to reduce impact",
    tips: [
      "Prefer shared coaches when routes exist.",
      "Fill the car with travelers instead of driving alone.",
      "Combine destinations in one loop to cut empty kilometres.",
      "Choose slower overland legs for the scenic part of the trip.",
    ],
  },
  bookingPage: {
    eyebrow: "Booking request",
    title: "Send your travel request",
    description: "This is a booking request, not an online payment. We confirm availability after review.",
    fullName: "Full name",
    phone: "Phone number",
    email: "Email address",
    notes: "Additional notes",
    tripSummary: "Selected trip details",
    carbonResult: "Carbon estimate for this trip",
    surveyTitle: "Sustainability preferences",
    preferredTransport: "Preferred transportation",
    preferredAccommodation: "Preferred accommodation",
    interestEco: "Interested in eco-friendly activities?",
    awareness: "Environmental awareness (1–5)",
    yes: "Yes",
    no: "No",
    confirmationTitle: "Request received",
    confirmationBody: "Thank you. Your booking request is pending review.",
    reference: "Booking reference",
  },
  admin: {
    loginTitle: "Admin sign in",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signOut: "Sign out",
    overview: "Overview",
    destinations: "Destinations",
    trips: "Trips",
    accommodations: "Accommodations",
    activities: "Activities",
    transport: "Transport",
    emissionFactors: "Emission factors",
    bookings: "Bookings",
    surveys: "Surveys",
    messages: "Messages",
    totalBookings: "Total bookings",
    pending: "Pending",
    confirmed: "Confirmed",
    save: "Save",
    delete: "Delete",
    create: "Create",
    edit: "Edit",
    status: "Status",
  },
};

const fr: PageCopy = {
  common: {
    backHome: "Retour à l'accueil",
    loading: "Chargement…",
    search: "Rechercher",
    filterWilaya: "Wilaya",
    allWilayas: "Toutes les wilayas",
    noResults: "Aucun résultat pour ces filtres.",
    bookNow: "Demander une réservation",
    viewDetails: "Voir les détails",
    from: "À partir de",
    currency: "DZD",
    days: "{count} jours",
    nights: "Nuits",
    travelers: "Voyageurs",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Enregistré avec succès.",
    error: "Une erreur est survenue. Réessayez.",
    required: "Obligatoire",
    next: "Continuer",
    back: "Retour",
    total: "Total estimé",
    continueBooking: "Continuer vers la réservation",
  },
  about: {
    eyebrow: "À propos de Sirius Trail",
    title: "Voyager en protégeant les lieux que nous aimons",
    intro:
      "Sirius Trail est une plateforme de tourisme durable centrée sur l'Algérie. Nous relions voyageurs, destinations, hôtes et itinéraires qui respectent la nature et les communautés.",
    missionTitle: "Mission",
    mission:
      "Rendre le voyage responsable en Algérie clair, pratique et inspirant—pour que chaque trajet soutienne les personnes et les paysages.",
    visionTitle: "Vision",
    vision:
      "Une culture touristique où découverte et soin de l'environnement avancent ensemble, avec les communautés locales au centre.",
    valuesTitle: "Ce qui nous guide",
    values: [
      {
        title: "Protéger la nature",
        description: "Privilégier les itinéraires, séjours et activités qui respectent les écosystèmes.",
      },
      {
        title: "Soutenir les communautés",
        description: "Mettre en avant hôtes familiaux, coopératives et guides.",
      },
      {
        title: "Voyager en conscience",
        description: "Donner des outils simples pour comparer l'impact et choisir avec intention.",
      },
    ],
  },
  destinationsPage: {
    eyebrow: "Destinations",
    title: "Des lieux durables à travers l'Algérie",
    description: "Recherchez et filtrez par wilaya, puis ouvrez une destination pour voir activités, hébergements et voyages.",
    activities: "Activités",
    lodging: "Hébergement",
    relatedTrips: "Voyages disponibles",
    wilaya: "Wilaya",
  },
  toursPage: {
    eyebrow: "Éco-circuits",
    title: "Des voyages conçus avec soin",
    description: "Parcourez des circuits avec durée, prix de départ et demande de réservation.",
    duration: "Durée",
    destination: "Destination",
    includes: "Expériences incluses",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Écrire à l'équipe Sirius Trail",
    description: "Questions sur les destinations, voyages ou partenariats—envoyez un message.",
    name: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    message: "Message",
    successMessage: "Merci. Votre message a bien été reçu.",
  },
  plannerPage: {
    eyebrow: "Planificateur",
    title: "Composez votre voyage étape par étape",
    description: "Choisissez destination, hébergement, activités et transport, puis voyez un prix estimé en DZD.",
    stepDestination: "Destination",
    stepAccommodation: "Hébergement",
    stepActivities: "Activités",
    stepTransport: "Transport",
    stepDetails: "Détails",
    stepSummary: "Résumé",
    selectDestination: "Choisir une destination",
    selectAccommodation: "Choisir un hébergement",
    selectActivities: "Choisir une ou plusieurs activités",
    selectTransport: "Choisir un transport",
    travelDate: "Date de voyage",
    travelDistance: "Distance du trajet (km)",
    carbonEstimate: "Empreinte carbone estimée",
    summaryTitle: "Votre voyage personnalisé",
    priceBreakdown: "Détail du prix",
    accommodationCost: "Hébergement",
    activitiesCost: "Activités",
    transportCost: "Transport",
    confirmBooking: "Confirmer la demande de réservation",
  },
  carbonPage: {
    eyebrow: "Calculateur carbone",
    title: "Estimez l'empreinte de votre trajet",
    description:
      "Sans compte. Indiquez distance, mode de transport et voyageurs pour comparer en kg CO2e.",
    distance: "Distance (km)",
    transport: "Transport",
    travelers: "Voyageurs",
    calculate: "Calculer l'empreinte",
    result: "Émissions estimées",
    comparison: "Comparer les options",
    bestOption: "Option la plus favorable pour ce trajet",
    education:
      "Ces chiffres sont des estimations basées sur des facteurs moyens enregistrés en base. L'admin peut les mettre à jour.",
    estimateNote:
      "Résultats indicatifs. Les émissions réelles varient selon le véhicule, la source d'électricité et le taux d'occupation.",
    savingsLabel: "Économie environnementale vs référence",
    savingsVs: "Par rapport à une voiture essence pour le même trajet",
    noLoginNeeded: "Ouvert à tous les visiteurs — aucune inscription.",
    unit: "kg CO2e",
    tipsTitle: "Réduire l'impact",
    tips: [
      "Privilégiez le car partagé lorsqu'il existe.",
      "Remplissez la voiture plutôt que de voyager seul.",
      "Combinez les destinations en une boucle pour limiter les kilomètres à vide.",
      "Choisissez des étapes terrestres plus lentes pour la partie scenic.",
    ],
  },
  bookingPage: {
    eyebrow: "Demande de réservation",
    title: "Envoyez votre demande",
    description: "Il s'agit d'une demande, pas d'un paiement en ligne. Nous confirmons après vérification.",
    fullName: "Nom complet",
    phone: "Téléphone",
    email: "E-mail",
    notes: "Notes supplémentaires",
    tripSummary: "Détails du voyage choisi",
    carbonResult: "Estimation carbone de ce trajet",
    surveyTitle: "Préférences durables",
    preferredTransport: "Transport préféré",
    preferredAccommodation: "Hébergement préféré",
    interestEco: "Intéressé par des activités écologiques ?",
    awareness: "Conscience environnementale (1–5)",
    yes: "Oui",
    no: "Non",
    confirmationTitle: "Demande reçue",
    confirmationBody: "Merci. Votre demande est en attente de revue.",
    reference: "Référence",
  },
  admin: {
    loginTitle: "Connexion admin",
    email: "E-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    overview: "Vue d'ensemble",
    destinations: "Destinations",
    trips: "Voyages",
    accommodations: "Hébergements",
    activities: "Activités",
    transport: "Transport",
    emissionFactors: "Facteurs d'émission",
    bookings: "Réservations",
    surveys: "Enquêtes",
    messages: "Messages",
    totalBookings: "Réservations totales",
    pending: "En attente",
    confirmed: "Confirmées",
    save: "Enregistrer",
    delete: "Supprimer",
    create: "Créer",
    edit: "Modifier",
    status: "Statut",
  },
};

const ar: PageCopy = {
  common: {
    backHome: "العودة إلى الرئيسية",
    loading: "جارٍ التحميل…",
    search: "بحث",
    filterWilaya: "الولاية",
    allWilayas: "كل الولايات",
    noResults: "لا نتائج مطابقة للتصفية.",
    bookNow: "اطلب الحجز",
    viewDetails: "عرض التفاصيل",
    from: "ابتداءً من",
    currency: "د.ج",
    days: "{count} أيام",
    nights: "الليالي",
    travelers: "المسافرون",
    submit: "إرسال",
    sending: "جارٍ الإرسال…",
    success: "تم الحفظ بنجاح.",
    error: "حدث خطأ. حاول مرة أخرى.",
    required: "مطلوب",
    next: "متابعة",
    back: "رجوع",
    total: "الإجمالي التقديري",
    continueBooking: "المتابعة إلى الحجز",
  },
  about: {
    eyebrow: "عن Sirius Trail",
    title: "سفر يحمي الأماكن التي نحبها",
    intro:
      "Sirius Trail منصة سياحة مستدامة تركّز على الجزائر. نربط المسافرين بوجهات ومضيفين ورحلات تحترم الطبيعة والمجتمعات المحلية.",
    missionTitle: "المهمة",
    mission:
      "جعل السفر المسؤول في الجزائر واضحًا وعمليًا وملهمًا—لتدعم كل رحلة الناس والمناظر.",
    visionTitle: "الرؤية",
    vision:
      "ثقافة سياحية يسير فيها الاكتشاف والعناية بالبيئة معًا، وتبقى المجتمعات المحلية في المركز.",
    valuesTitle: "ما يوجّهنا",
    values: [
      {
        title: "حماية الطبيعة",
        description: "تفضيل المسارات والإقامات والأنشطة التي تحترم النظم البيئية.",
      },
      {
        title: "دعم المجتمعات",
        description: "إبراز المضيفين العائليين والتعاونيات والمرشدين.",
      },
      {
        title: "سفر بوعي",
        description: "أدوات بسيطة لمقارنة الأثر والاختيار بقصد.",
      },
    ],
  },
  destinationsPage: {
    eyebrow: "الوجهات",
    title: "أماكن مستدامة عبر الجزائر",
    description: "ابحث وصفِّ حسب الولاية، ثم افتح الوجهة لترى الأنشطة والإقامة والرحلات.",
    activities: "الأنشطة",
    lodging: "الإقامة",
    relatedTrips: "الرحلات المتاحة",
    wilaya: "الولاية",
  },
  toursPage: {
    eyebrow: "الجولات البيئية",
    title: "رحلات صُممت بعناية",
    description: "تصفّح رحلات مع المدة والسعر الابتدائي ومسار طلب حجز واضح.",
    duration: "المدة",
    destination: "الوجهة",
    includes: "التجارب المشمولة",
  },
  contactPage: {
    eyebrow: "تواصل",
    title: "راسل فريق Sirius Trail",
    description: "أسئلة عن الوجهات أو الرحلات أو الشراكات—أرسل رسالة وسنرد.",
    name: "الاسم الكامل",
    email: "البريد",
    phone: "الهاتف",
    message: "الرسالة",
    successMessage: "شكرًا لك. وصلتنا رسالتك.",
  },
  plannerPage: {
    eyebrow: "مخطط الرحلة",
    title: "ابنِ رحلتك خطوة بخطوة",
    description: "اختر الوجهة والإقامة والأنشطة والنقل، ثم راجع سعرًا تقديريًا بالدينار.",
    stepDestination: "الوجهة",
    stepAccommodation: "الإقامة",
    stepActivities: "الأنشطة",
    stepTransport: "النقل",
    stepDetails: "تفاصيل الرحلة",
    stepSummary: "الملخص",
    selectDestination: "اختر وجهة",
    selectAccommodation: "اختر إقامة",
    selectActivities: "اختر نشاطًا أو أكثر",
    selectTransport: "اختر وسيلة نقل",
    travelDate: "تاريخ السفر",
    travelDistance: "مسافة الرحلة (كم)",
    carbonEstimate: "البصمة الكربونية التقديرية",
    summaryTitle: "رحلتك المخصصة",
    priceBreakdown: "تفصيل السعر",
    accommodationCost: "الإقامة",
    activitiesCost: "الأنشطة",
    transportCost: "النقل",
    confirmBooking: "تأكيد طلب الحجز",
  },
  carbonPage: {
    eyebrow: "حاسبة الكربون",
    title: "قدّر أثر رحلتك",
    description:
      "بدون حساب. أدخل المسافة واختر وسيلة النقل وعدد المسافرين للمقارنة بوحدة كغ مكافئ CO₂.",
    distance: "المسافة (كم)",
    transport: "وسيلة النقل",
    travelers: "المسافرون",
    calculate: "احسب الأثر",
    result: "الانبعاثات التقديرية",
    comparison: "مقارنة الخيارات",
    bestOption: "الخيار الأنسب بيئيًا لهذه الرحلة",
    education:
      "هذه أرقام تقديرية وفق معاملات مخزّنة في قاعدة البيانات، ويمكن للأدمن تعديلها من لوحة التحكم.",
    estimateNote:
      "النتائج تقديرية فقط. تختلف الانبعاثات الفعلية حسب نوع المركبة ومصدر الكهرباء ونسبة الإشغال.",
    savingsLabel: "نسبة التوفير البيئي مقابل المرجع",
    savingsVs: "مقارنة بسيارة بنزين خاصة لنفس الرحلة",
    noLoginNeeded: "متاحة لكل الزوار — دون تسجيل دخول.",
    unit: "كغ مكافئ CO₂",
    tipsTitle: "طرق لتقليل الأثر",
    tips: [
      "فضّل الحافلة المشتركة عند توفرها.",
      "املأ السيارة بالمسافرين بدل القيادة وحدك.",
      "اجمع الوجهات في حلقة واحدة لتقليل الكيلومترات الفارغة.",
      "اختر مراحل برية أبطأ للجزء الجميل من الرحلة.",
    ],
  },
  bookingPage: {
    eyebrow: "طلب حجز",
    title: "أرسل طلب سفرك",
    description: "هذا طلب حجز وليس دفعًا إلكترونيًا. نؤكّد التوفر بعد المراجعة.",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    notes: "ملاحظات إضافية",
    tripSummary: "تفاصيل الرحلة المختارة",
    carbonResult: "تقدير البصمة الكربونية لهذه الرحلة",
    surveyTitle: "تفضيلات الاستدامة",
    preferredTransport: "وسيلة النقل المفضلة",
    preferredAccommodation: "نوع الإقامة المفضل",
    interestEco: "هل تهتم بأنشطة صديقة للبيئة؟",
    awareness: "الوعي البيئي (1–5)",
    yes: "نعم",
    no: "لا",
    confirmationTitle: "وصل الطلب",
    confirmationBody: "شكرًا لك. طلب الحجز قيد المراجعة.",
    reference: "مرجع الحجز",
  },
  admin: {
    loginTitle: "دخول المسؤول",
    email: "البريد",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    overview: "نظرة عامة",
    destinations: "الوجهات",
    trips: "الرحلات",
    accommodations: "الإقامات",
    activities: "الأنشطة",
    transport: "النقل",
    emissionFactors: "عوامل الانبعاث",
    bookings: "الحجوزات",
    surveys: "الاستبيانات",
    messages: "الرسائل",
    totalBookings: "إجمالي الحجوزات",
    pending: "قيد الانتظار",
    confirmed: "مؤكدة",
    save: "حفظ",
    delete: "حذف",
    create: "إنشاء",
    edit: "تعديل",
    status: "الحالة",
  },
};

export const pageCopy: Record<Locale, PageCopy> = { en, fr, ar };

export function usePageCopy(locale: Locale) {
  return pageCopy[locale];
}
