import type { Locale } from "@/types";

export type AdminFormCopy = {
  createNew: string;
  editItem: string;
  save: string;
  delete: string;
  create: string;
  published: string;
  active: string;
  displayOrder: string;
  coverImage: string;
  coverImageHint: string;
  gallery: string;
  addImage: string;
  imageUrl: string;
  imageCaption: string;
  wilaya: string;
  destination: string;
  noDestination: string;
  durationDays: string;
  priceDzd: string;
  pricePerNight: string;
  accommodationType: string;
  typeGuesthouse: string;
  typeEcoCamp: string;
  typeGreenHotel: string;
  forPlanner: string;
  forCarbon: string;
  kgPerKm: string;
  name: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  accommodationLabel: string;
  activitiesList: string;
  accommodationsList: string;
  itineraryList: string;
  listHint: string;
  langEn: string;
  langFr: string;
  langAr: string;
  confirmDelete: string;
  none: string;
};

const en: AdminFormCopy = {
  createNew: "Add new",
  editItem: "Edit",
  save: "Save changes",
  delete: "Delete",
  create: "Create",
  published: "Visible on the website",
  active: "Available for booking",
  displayOrder: "Display order",
  coverImage: "Cover image link",
  coverImageHint: "Paste the full link of the photo you want to show",
  gallery: "Photo gallery",
  addImage: "Add photo",
  imageUrl: "Photo link",
  imageCaption: "Photo description",
  wilaya: "Wilaya",
  destination: "Destination",
  noDestination: "Not linked to a destination",
  durationDays: "Duration (days)",
  priceDzd: "Price (DZD)",
  pricePerNight: "Price per night (DZD)",
  accommodationType: "Accommodation type",
  typeGuesthouse: "Guesthouse",
  typeEcoCamp: "Eco camp",
  typeGreenHotel: "Green hotel",
  forPlanner: "Show in trip planner",
  forCarbon: "Show in carbon calculator",
  kgPerKm: "Emissions (kg per km)",
  name: "Name",
  location: "Location label",
  shortDescription: "Short description",
  longDescription: "Full description",
  category: "Category",
  accommodationLabel: "Stay included",
  activitiesList: "Activities",
  accommodationsList: "Stay options",
  itineraryList: "Itinerary (one day per line)",
  listHint: "Write one item per line. Keep the same order in each language.",
  langEn: "English",
  langFr: "French",
  langAr: "Arabic",
  confirmDelete: "Delete this item?",
  none: "None",
};

const fr: AdminFormCopy = {
  createNew: "Ajouter",
  editItem: "Modifier",
  save: "Enregistrer",
  delete: "Supprimer",
  create: "Créer",
  published: "Visible sur le site",
  active: "Disponible à la réservation",
  displayOrder: "Ordre d'affichage",
  coverImage: "Lien de l'image de couverture",
  coverImageHint: "Collez le lien complet de la photo à afficher",
  gallery: "Galerie photos",
  addImage: "Ajouter une photo",
  imageUrl: "Lien de la photo",
  imageCaption: "Description de la photo",
  wilaya: "Wilaya",
  destination: "Destination",
  noDestination: "Non liée à une destination",
  durationDays: "Durée (jours)",
  priceDzd: "Prix (DZD)",
  pricePerNight: "Prix par nuit (DZD)",
  accommodationType: "Type d'hébergement",
  typeGuesthouse: "Maison d'hôtes",
  typeEcoCamp: "Camp écologique",
  typeGreenHotel: "Hôtel vert",
  forPlanner: "Afficher dans le planificateur",
  forCarbon: "Afficher dans le calculateur carbone",
  kgPerKm: "Émissions (kg par km)",
  name: "Nom",
  location: "Libellé du lieu",
  shortDescription: "Description courte",
  longDescription: "Description complète",
  category: "Catégorie",
  accommodationLabel: "Hébergement inclus",
  activitiesList: "Activités",
  accommodationsList: "Options d'hébergement",
  itineraryList: "Itinéraire (un jour par ligne)",
  listHint: "Un élément par ligne. Gardez le même ordre dans chaque langue.",
  langEn: "Anglais",
  langFr: "Français",
  langAr: "Arabe",
  confirmDelete: "Supprimer cet élément ?",
  none: "Aucun",
};

const ar: AdminFormCopy = {
  createNew: "إضافة جديد",
  editItem: "تعديل",
  save: "حفظ التغييرات",
  delete: "حذف",
  create: "إنشاء",
  published: "ظاهر على الموقع",
  active: "متاح للحجز",
  displayOrder: "ترتيب العرض",
  coverImage: "رابط صورة الغلاف",
  coverImageHint: "الصق رابط الصورة الكامل الذي تريد عرضه",
  gallery: "معرض الصور",
  addImage: "إضافة صورة",
  imageUrl: "رابط الصورة",
  imageCaption: "وصف الصورة",
  wilaya: "الولاية",
  destination: "الوجهة",
  noDestination: "غير مرتبط بوجهة",
  durationDays: "المدة (أيام)",
  priceDzd: "السعر (دج)",
  pricePerNight: "سعر الليلة (دج)",
  accommodationType: "نوع الإقامة",
  typeGuesthouse: "بيت ضيافة",
  typeEcoCamp: "مخيم بيئي",
  typeGreenHotel: "فندق أخضر",
  forPlanner: "إظهار في مخطط الرحلة",
  forCarbon: "إظهار في حاسبة الكربون",
  kgPerKm: "الانبعاثات (كغ لكل كم)",
  name: "الاسم",
  location: "الموقع",
  shortDescription: "وصف مختصر",
  longDescription: "الوصف الكامل",
  category: "التصنيف",
  accommodationLabel: "الإقامة المشمولة",
  activitiesList: "الأنشطة",
  accommodationsList: "خيارات الإقامة",
  itineraryList: "البرنامج (سطر لكل يوم)",
  listHint: "اكتب عنصرًا في كل سطر. حافظ على نفس الترتيب في كل لغة.",
  langEn: "الإنجليزية",
  langFr: "الفرنسية",
  langAr: "العربية",
  confirmDelete: "هل تريد حذف هذا العنصر؟",
  none: "لا يوجد",
};

export const adminFormCopy: Record<Locale, AdminFormCopy> = { en, fr, ar };
