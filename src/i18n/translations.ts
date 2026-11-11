import type { Dictionary, Locale } from "@/types";

const en: Dictionary = {
  nav: {
    primary: "Primary",
    home: "Home",
    about: "About",
    destinations: "Destinations",
    plan: "Plan Your Trip",
    carbon: "Carbon Calculator",
    explore: "Explore Destinations",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
  },
  brand: {
    name: "Azul",
    tagline: "Sustainable travel",
  },
  hero: {
    eyebrow: "Algeria · Sustainable travel",
    titleLead: "Discover Nature.",
    titleAccent: "Travel Responsibly.",
    description:
      "Explore extraordinary destinations, experience authentic local cultures, and create meaningful journeys that respect our planet.",
    primaryCta: "Explore Destinations",
    secondaryCta: "Plan Your Journey",
    scroll: "Scroll",
    alt: "Sunset over the dunes of Taghit, in the Algerian Sahara.",
  },
  intro: {
    eyebrow: "Our approach",
    title: "Travel That Makes a Difference",
    description:
      "We believe travel should create lasting memories while protecting the natural environments and communities that make every destination unique.",
    features: [
      {
        title: "Protect Nature",
        description:
          "Discover experiences that respect ecosystems and preserve natural resources.",
      },
      {
        title: "Support Local Communities",
        description:
          "Connect with local cultures and support authentic local businesses.",
      },
      {
        title: "Travel Consciously",
        description:
          "Make informed travel choices and understand your environmental impact.",
      },
    ],
  },
  destinations: {
    eyebrow: "Algeria",
    title: "Explore Extraordinary Destinations",
    description:
      "From breathtaking deserts to peaceful mountain villages, discover the authentic beauty of Algeria.",
    explore: "Explore destination",
    items: {
      ghardaia: {
        name: "Ghardaïa",
        description: "Traditional architecture and authentic Saharan culture.",
        location: "M'Zab Valley",
        alt: "Earthen ksar architecture and a palm in Ksar Tafilelt, in the M'Zab near Ghardaïa.",
      },
      tassili: {
        name: "Tassili n'Ajjer",
        description: "Spectacular desert landscapes and ancient natural heritage.",
        location: "Djanet",
        alt: "Sandstone towers and dunes in the Tassili n'Ajjer, Algerian Sahara.",
      },
      djurdjura: {
        name: "Djurdjura Mountains",
        description: "Majestic mountains and beautiful natural trails.",
        location: "Kabylia",
        alt: "A hillside village beneath the limestone peaks of the Djurdjura.",
      },
      taghit: {
        name: "Taghit",
        description: "Golden dunes and a unique oasis experience.",
        location: "Béchar",
        alt: "Golden sand dunes near Taghit, in western Algeria.",
      },
    },
  },
  trips: {
    eyebrow: "Selected journeys",
    title: "Journeys Designed for Nature Lovers",
    description:
      "Slow routes with local hosts and stays chosen for the care they give the place.",
    view: "View details",
    from: "From",
    currency: "DZD",
    days: "{count} days",
    items: {
      mzab: {
        title: "M'Zab Heritage Days",
        accommodation: "Family guesthouse in the ksar",
        category: "Community-hosted",
        alt: "A narrow earthen street in Ksar Tafilelt, in the M'Zab.",
      },
      tassili: {
        title: "Tassili Plateau Walk",
        accommodation: "Small desert camp",
        category: "Low-impact desert route",
        alt: "Rock formations rising from the sand in the Tassili.",
      },
      djurdjura: {
        title: "Djurdjura Ridge Days",
        accommodation: "Mountain refuge",
        category: "Guided nature trails",
        alt: "The Djurdjura massif above green foothills in Kabylia.",
      },
    },
  },
  planner: {
    eyebrow: "Trip planner",
    title: "Your Journey, Your Way",
    description:
      "Create a personalized journey that matches your interests, budget, and passion for sustainable travel.",
    cta: "Start Planning",
    alt: "Forested foothills with the Djurdjura range beyond, in Kabylia.",
    steps: [
      {
        title: "Interests",
        description: "Mountains, desert, culture, or a mix of all three.",
      },
      {
        title: "Pace",
        description: "A few quiet days, or a longer traverse.",
      },
      {
        title: "Stay",
        description: "Guesthouses, refuges, and small camps.",
      },
    ],
  },
  carbon: {
    eyebrow: "Carbon calculator",
    title: "Every Journey Leaves a Footprint",
    description:
      "Understand the environmental impact of your journey and compare transportation options to make more sustainable choices.",
    cta: "Calculate Your Footprint",
    note: "A visual guide for comparing options. These marks are not a measurement.",
    modes: [
      {
        title: "Shared coach",
        description: "Often the lighter choice for a regional journey.",
      },
      {
        title: "Train",
        description: "A strong option where a rail service exists.",
      },
      {
        title: "Private car",
        description: "Flexible. The impact depends on how many people share the ride.",
      },
      {
        title: "Flight",
        description: "Usually the heaviest choice on a short route.",
      },
    ],
  },
  impact: {
    eyebrow: "A shared direction",
    title: "Together for a Greener Future",
    description:
      "Three ideas that shape how this platform talks about travel. They are principles, not a record of results.",
    items: [
      {
        title: "Responsible Tourism",
        description:
          "Choose guides and stays that follow local conservation rules, keep to marked paths, and leave natural sites as you found them.",
        alt: "Desert rock formations in the Algerian Sahara.",
      },
      {
        title: "Local Community Support",
        description:
          "Spend with family-run guesthouses, cooperatives, and guides so more of your journey stays in the place you visit.",
        alt: "An earthen lane in the M'Zab, where family guesthouses sit inside the ksar.",
      },
      {
        title: "Environmental Awareness",
        description:
          "Learn how water, waste, and transport shape a destination before you go, then travel with that knowledge.",
        alt: "Green foothills below the Djurdjura mountains.",
      },
    ],
  },
  finalCta: {
    titleLead: "The World Is Beautiful.",
    titleAccent: "Let's Explore It Responsibly.",
    description: "Start your next journey and discover a more conscious way to travel.",
    cta: "Discover Your Next Journey",
    alt: "The peaks of Assekrem in the Hoggar Mountains of southern Algeria.",
  },
  footer: {
    description:
      "Azul introduces Algeria through careful journeys, local hosts, and landscapes worth protecting.",
    explore: "Explore",
    prepare: "Prepare",
    places: "Places",
    contact: "Contact",
    rights: "All rights reserved.",
    photos: "Photographs from Wikimedia Commons contributors, used under Creative Commons.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Studio",
    address: "Algiers, Algeria",
    instagram: "Azul on Instagram",
    facebook: "Azul on Facebook",
    youtube: "Azul on YouTube",
  },
  placeholder: {
    eyebrow: "Later release",
    title: "This page is on its way",
    description:
      "The homepage is ready. This section will be designed in a later step, and nothing here is a finished service yet.",
    back: "Back to homepage",
  },
};

const fr: Dictionary = {
  nav: {
    primary: "Navigation principale",
    home: "Accueil",
    about: "À propos",
    destinations: "Destinations",
    plan: "Planifier votre voyage",
    carbon: "Calculateur carbone",
    explore: "Explorer les destinations",
    language: "Langue",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    skip: "Aller au contenu",
  },
  brand: {
    name: "Azul",
    tagline: "Voyage durable",
  },
  hero: {
    eyebrow: "Algérie · Voyage durable",
    titleLead: "Découvrez la nature.",
    titleAccent: "Voyagez autrement.",
    description:
      "Explorez des destinations exceptionnelles, vivez des expériences locales authentiques et voyagez dans le respect de notre planète.",
    primaryCta: "Explorer les destinations",
    secondaryCta: "Planifier votre voyage",
    scroll: "Défiler",
    alt: "Coucher de soleil sur les dunes de Taghit, dans le Sahara algérien.",
  },
  intro: {
    eyebrow: "Notre approche",
    title: "Un voyage qui fait la différence",
    description:
      "Nous croyons que le voyage doit créer des souvenirs durables tout en protégeant les milieux naturels et les communautés qui rendent chaque destination unique.",
    features: [
      {
        title: "Protéger la nature",
        description:
          "Découvrez des expériences qui respectent les écosystèmes et préservent les ressources naturelles.",
      },
      {
        title: "Soutenir les communautés locales",
        description:
          "Rencontrez les cultures locales et soutenez des entreprises authentiques.",
      },
      {
        title: "Voyager en conscience",
        description:
          "Faites des choix éclairés et comprenez l'impact environnemental de votre voyage.",
      },
    ],
  },
  destinations: {
    eyebrow: "Algérie",
    title: "Explorez des destinations extraordinaires",
    description:
      "Des déserts à couper le souffle aux villages de montagne paisibles, découvrez la beauté authentique de l'Algérie.",
    explore: "Explorer la destination",
    items: {
      ghardaia: {
        name: "Ghardaïa",
        description: "Architecture traditionnelle et culture saharienne authentique.",
        location: "Vallée du M'Zab",
        alt: "Architecture de terre et palmier au ksar Tafilelt, dans le M'Zab près de Ghardaïa.",
      },
      tassili: {
        name: "Tassili n'Ajjer",
        description: "Paysages désertiques spectaculaires et patrimoine naturel millénaire.",
        location: "Djanet",
        alt: "Tours de grès et dunes dans le Tassili n'Ajjer, Sahara algérien.",
      },
      djurdjura: {
        name: "Montagnes du Djurdjura",
        description: "Montagnes majestueuses et sentiers naturels d'une grande beauté.",
        location: "Kabylie",
        alt: "Un village à flanc de colline sous les crêtes calcaires du Djurdjura.",
      },
      taghit: {
        name: "Taghit",
        description: "Dunes dorées et une expérience d'oasis singulière.",
        location: "Béchar",
        alt: "Dunes dorées près de Taghit, dans l'ouest de l'Algérie.",
      },
    },
  },
  trips: {
    eyebrow: "Voyages choisis",
    title: "Des voyages pensés pour les amoureux de la nature",
    description:
      "Des itinéraires lents, des hôtes locaux et des hébergements choisis pour l'attention qu'ils portent au lieu.",
    view: "Voir les détails",
    from: "À partir de",
    currency: "DZD",
    days: "{count} jours",
    items: {
      mzab: {
        title: "Journées patrimoniales du M'Zab",
        accommodation: "Maison d'hôtes familiale dans le ksar",
        category: "Accueil communautaire",
        alt: "Une ruelle de terre au ksar Tafilelt, dans le M'Zab.",
      },
      tassili: {
        title: "Marche sur le plateau du Tassili",
        accommodation: "Petit campement désertique",
        category: "Route désertique à faible impact",
        alt: "Formations rocheuses surgissant du sable dans le Tassili.",
      },
      djurdjura: {
        title: "Jours sur les crêtes du Djurdjura",
        accommodation: "Refuge de montagne",
        category: "Sentiers nature avec guide",
        alt: "Le massif du Djurdjura au-dessus des contreforts verts de Kabylie.",
      },
    },
  },
  planner: {
    eyebrow: "Planificateur",
    title: "Votre voyage, à votre façon",
    description:
      "Composez un voyage personnalisé selon vos envies, votre budget et votre goût du voyage durable.",
    cta: "Commencer à planifier",
    alt: "Contreforts boisés avec le Djurdjura à l'horizon, en Kabylie.",
    steps: [
      {
        title: "Envies",
        description: "Montagnes, désert, culture, ou un mélange des trois.",
      },
      {
        title: "Rythme",
        description: "Quelques jours calmes, ou une traversée plus longue.",
      },
      {
        title: "Hébergement",
        description: "Maisons d'hôtes, refuges et petits campements.",
      },
    ],
  },
  carbon: {
    eyebrow: "Calculateur carbone",
    title: "Chaque voyage laisse une empreinte",
    description:
      "Comprenez l'impact environnemental de votre voyage et comparez les modes de transport pour faire des choix plus durables.",
    cta: "Calculer votre empreinte",
    note: "Un repère visuel pour comparer les options. Ces marques ne sont pas une mesure.",
    modes: [
      {
        title: "Autocar partagé",
        description: "Souvent le choix le plus léger pour un trajet régional.",
      },
      {
        title: "Train",
        description: "Une option solide là où le rail existe.",
      },
      {
        title: "Voiture privée",
        description: "Souple. L'impact dépend du nombre de personnes à bord.",
      },
      {
        title: "Avion",
        description: "Généralement le choix le plus lourd sur un court trajet.",
      },
    ],
  },
  impact: {
    eyebrow: "Une direction commune",
    title: "Ensemble pour un avenir plus vert",
    description:
      "Trois idées qui orientent la façon dont cette plateforme parle du voyage. Ce sont des principes, pas un bilan de résultats.",
    items: [
      {
        title: "Tourisme responsable",
        description:
          "Choisissez des guides et des hébergements qui respectent les règles locales de conservation, restent sur les sentiers balisés et laissent les sites tels qu'ils les ont trouvés.",
        alt: "Formations rocheuses dans le Sahara algérien.",
      },
      {
        title: "Soutien aux communautés locales",
        description:
          "Dépensez auprès de maisons d'hôtes familiales, de coopératives et de guides, pour que votre voyage profite davantage au lieu visité.",
        alt: "Une ruelle de terre dans le M'Zab, où des maisons d'hôtes familiales occupent le ksar.",
      },
      {
        title: "Conscience environnementale",
        description:
          "Avant de partir, comprenez comment l'eau, les déchets et le transport façonnent une destination, puis voyagez avec cette connaissance.",
        alt: "Contreforts verts sous les montagnes du Djurdjura.",
      },
    ],
  },
  finalCta: {
    titleLead: "Le monde est beau.",
    titleAccent: "Explorons-le avec responsabilité.",
    description:
      "Commencez votre prochain voyage et découvrez une façon plus consciente de partir.",
    cta: "Découvrir votre prochain voyage",
    alt: "Les pics de l'Assekrem, dans le massif du Hoggar, au sud de l'Algérie.",
  },
  footer: {
    description:
      "Azul fait découvrir l'Algérie par des itinéraires attentifs, des hôtes locaux et des paysages à protéger.",
    explore: "Explorer",
    prepare: "Préparer",
    places: "Lieux",
    contact: "Contact",
    rights: "Tous droits réservés.",
    photos:
      "Photographies de contributeurs Wikimedia Commons, utilisées sous licence Creative Commons.",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    addressLabel: "Atelier",
    address: "Alger, Algérie",
    instagram: "Azul sur Instagram",
    facebook: "Azul sur Facebook",
    youtube: "Azul sur YouTube",
  },
  placeholder: {
    eyebrow: "Prochaine étape",
    title: "Cette page arrive bientôt",
    description:
      "La page d'accueil est prête. Cette section sera conçue plus tard, et rien ici n'est encore un service abouti.",
    back: "Retour à l'accueil",
  },
};

const ar: Dictionary = {
  nav: {
    primary: "التنقل الرئيسي",
    home: "الرئيسية",
    about: "عن المنصة",
    destinations: "الوجهات",
    plan: "خطط رحلتك",
    carbon: "حاسبة الكربون",
    explore: "استكشف الوجهات",
    language: "اللغة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    skip: "تخطَّ إلى المحتوى",
  },
  brand: {
    name: "أزول",
    tagline: "سفر مستدام",
  },
  hero: {
    eyebrow: "الجزائر · سفر مستدام",
    titleLead: "اكتشف جمال الطبيعة...",
    titleAccent: "وسافر بمسؤولية",
    description:
      "اكتشف وجهات استثنائية، وعش تجارب محلية أصيلة، وصمم رحلات تحترم الطبيعة وتحافظ على كوكبنا.",
    primaryCta: "استكشف الوجهات",
    secondaryCta: "خطط رحلتك",
    scroll: "مرّر",
    alt: "غروب الشمس على كثبان تاغيت في الصحراء الجزائرية.",
  },
  intro: {
    eyebrow: "نهجنا",
    title: "سفر يصنع فرقًا",
    description:
      "نؤمن بأن السفر ينبغي أن يصنع ذكريات تدوم، ويحمي في الوقت نفسه البيئات الطبيعية والمجتمعات التي تمنح كل وجهة تفرّدها.",
    features: [
      {
        title: "حماية الطبيعة",
        description: "اكتشف تجارب تحترم النظم البيئية وتحافظ على الموارد الطبيعية.",
      },
      {
        title: "دعم المجتمعات المحلية",
        description: "تواصل مع الثقافات المحلية وادعم المشاريع الأصيلة.",
      },
      {
        title: "سافر بوعي",
        description: "اتخذ خيارات سفر مدروسة وافهم أثرك البيئي.",
      },
    ],
  },
  destinations: {
    eyebrow: "الجزائر",
    title: "استكشف وجهات استثنائية",
    description:
      "من صحارى تخطف الأنفاس إلى قرى جبلية هادئة، اكتشف الجمال الأصيل للجزائر.",
    explore: "استكشف الوجهة",
    items: {
      ghardaia: {
        name: "غرداية",
        description: "عمارة تقليدية وثقافة صحراوية أصيلة.",
        location: "وادي مزاب",
        alt: "عمارة طينية ونخلة في قصر تافيلالت بوادي مزاب قرب غرداية.",
      },
      tassili: {
        name: "طاسيلي ناجر",
        description: "مناظر صحراوية مذهلة وتراث طبيعي عريق.",
        location: "جانت",
        alt: "أبراج حجرية وكثبان في طاسيلي ناجر بالصحراء الجزائرية.",
      },
      djurdjura: {
        name: "جبال جرجرة",
        description: "جبال شامخة ومسارات طبيعية خلابة.",
        location: "القبائل",
        alt: "قرية على سفح تحت قمم جرجرة الكلسية.",
      },
      taghit: {
        name: "تاغيت",
        description: "كثبان ذهبية وتجربة واحة فريدة.",
        location: "بشار",
        alt: "كثبان رملية ذهبية قرب تاغيت في غرب الجزائر.",
      },
    },
  },
  trips: {
    eyebrow: "رحلات مختارة",
    title: "رحلات مصممة لعشّاق الطبيعة",
    description: "مسارات هادئة مع مضيفين محليين وإقامات اختيرت لعنايتها بالمكان.",
    view: "عرض التفاصيل",
    from: "ابتداءً من",
    currency: "د.ج",
    days: "{count} أيام",
    items: {
      mzab: {
        title: "أيام التراث في مزاب",
        accommodation: "بيت ضيافة عائلي في القصر",
        category: "استضافة مجتمعية",
        alt: "زقاق طيني ضيق في قصر تافيلالت بوادي مزاب.",
      },
      tassili: {
        title: "مسير هضبة الطاسيلي",
        accommodation: "مخيم صحراوي صغير",
        category: "مسار صحراوي منخفض الأثر",
        alt: "تكوينات صخرية ترتفع من الرمل في الطاسيلي.",
      },
      djurdjura: {
        title: "أيام على قمم جرجرة",
        accommodation: "مأوى جبلي",
        category: "مسارات طبيعية بمرشد",
        alt: "سلسلة جرجرة فوق السفوح الخضراء في منطقة القبائل.",
      },
    },
  },
  planner: {
    eyebrow: "مخطط الرحلة",
    title: "رحلتك، على طريقتك",
    description: "صمّم رحلة تناسب اهتماماتك وميزانيتك وشغفك بالسفر المستدام.",
    cta: "ابدأ التخطيط",
    alt: "سفوح غابية وجبال جرجرة في الأفق بمنطقة القبائل.",
    steps: [
      {
        title: "الاهتمامات",
        description: "جبال، صحراء، ثقافة، أو مزيج من الثلاثة.",
      },
      {
        title: "الإيقاع",
        description: "أيام هادئة قليلة، أو مسار أطول.",
      },
      {
        title: "الإقامة",
        description: "بيوت ضيافة ومآوٍ ومخيمات صغيرة.",
      },
    ],
  },
  carbon: {
    eyebrow: "حاسبة الكربون",
    title: "لكل رحلة أثر",
    description:
      "افهم الأثر البيئي لرحلتك وقارن بين وسائل النقل لتختار ما هو أكثر استدامة.",
    cta: "احسب أثرك",
    note: "دليل بصري لمقارنة الخيارات. هذه العلامات ليست نتيجة قياس.",
    modes: [
      {
        title: "حافلة مشتركة",
        description: "غالبًا الخيار الأخف للتنقل داخل المنطقة.",
      },
      {
        title: "القطار",
        description: "خيار مناسب حيث تتوفر السكك الحديدية.",
      },
      {
        title: "سيارة خاصة",
        description: "مرنة، ويختلف أثرها بحسب عدد من يتشاركون الرحلة.",
      },
      {
        title: "الطائرة",
        description: "غالبًا الخيار الأثقل في المسافات القصيرة.",
      },
    ],
  },
  impact: {
    eyebrow: "اتجاه مشترك",
    title: "معًا من أجل مستقبل أكثر اخضرارًا",
    description:
      "ثلاث أفكار توجّه طريقة حديث هذه المنصة عن السفر. إنها مبادئ، وليست حصيلة نتائج.",
    items: [
      {
        title: "سياحة مسؤولة",
        description:
          "اختر المرشدين وأماكن الإقامة الذين يلتزمون بقواعد الحماية المحلية، ويلتزمون المسارات المعلّمة، ويتركون المواقع كما وجدوها.",
        alt: "تكوينات صخرية في الصحراء الجزائرية.",
      },
      {
        title: "دعم المجتمع المحلي",
        description:
          "أنفق لدى بيوت الضيافة العائلية والتعاونيات والمرشدين، ليبقى قدر أكبر من رحلتك في المكان الذي تزوره.",
        alt: "زقاق طيني في مزاب، حيث تقع بيوت الضيافة العائلية داخل القصر.",
      },
      {
        title: "وعي بيئي",
        description:
          "تعرّف قبل السفر كيف تشكّل المياه والنفايات ووسائل النقل ملامح الوجهة، ثم سافر بهذه المعرفة.",
        alt: "سفوح خضراء تحت جبال جرجرة.",
      },
    ],
  },
  finalCta: {
    titleLead: "العالم جميل.",
    titleAccent: "فلنستكشفه بمسؤولية.",
    description: "ابدأ رحلتك القادمة واكتشف أسلوبًا أكثر وعيًا في السفر.",
    cta: "اكتشف رحلتك القادمة",
    alt: "قمم الأسكرام في جبال الهقار جنوب الجزائر.",
  },
  footer: {
    description:
      "تعرّف أزول بالجزائر عبر رحلات متأنية ومضيفين محليين ومناظر تستحق الحماية.",
    explore: "استكشف",
    prepare: "جهّز",
    places: "الأماكن",
    contact: "تواصل",
    rights: "جميع الحقوق محفوظة.",
    photos: "الصور من مساهمي ويكيميديا كومنز، وتُستخدم وفق رخصة المشاع الإبداعي.",
    emailLabel: "البريد",
    phoneLabel: "الهاتف",
    addressLabel: "المقر",
    address: "الجزائر العاصمة، الجزائر",
    instagram: "أزول على إنستغرام",
    facebook: "أزول على فيسبوك",
    youtube: "أزول على يوتيوب",
  },
  placeholder: {
    eyebrow: "مرحلة لاحقة",
    title: "هذه الصفحة قيد الإعداد",
    description:
      "الصفحة الرئيسية جاهزة. سيُصمَّم هذا القسم في مرحلة لاحقة، وليس هنا خدمة مكتملة بعد.",
    back: "العودة إلى الرئيسية",
  },
};

export const translations: Record<Locale, Dictionary> = { en, fr, ar };
