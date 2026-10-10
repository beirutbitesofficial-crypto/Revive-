/**
 * Central place for brand content & links.
 * Everything here was taken from thereviveclub.me — edit here, not in the components.
 */
export const site = {
  name: "The Revive Club",
  short: "Revive",
  tagline: "You'll feel different here.",
  area: "Beirut Waterfront",
  city: "Beirut",
  country: "Lebanon",
  since: 2026,
  /** WhatsApp number in international format, digits only. Receives the register form. */
  whatsapp: "96178745566",
  phoneLabel: "+961 78 745 566",
  email: "hello@thereviveclub.com",
  instagram: "https://instagram.com/thereviveclub",
  instagramHandle: "@thereviveclub",
  /** Classes, courts and recovery are booked through the club app. */
  app: "https://wngyy.app.link",
  directionsUrl: "https://maps.app.goo.gl/nyToiLFET4PWA2h19",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d35.5055742!3d33.9040612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f179542f30ca1%3A0xe84e40d6d7c79ef8!2sThe%20Revive%20Club!5e0!3m2!1sen!2slb!4v1720000000000",
  hours: [
    { days: "Mon – Fri", time: "06:00 – 23:00" },
    { days: "Sat – Sun", time: "08:00 – 23:00" },
  ],
  /** Live domain — used for social preview images. */
  url: "https://thereviveclub.me",
  /** Preview mode: keeps Google from indexing the site. Set to false once the client approves. */
  preview: true,
};

export const nav = [
  { label: "The Place", href: "#place" },
  { label: "The Gym", href: "#gym" },
  { label: "The Court", href: "#court" },
  { label: "Wellness", href: "#wellness" },
  { label: "Studio Rooms", href: "#studio" },
  { label: "Movement", href: "#movement" },
  { label: "Register", href: "#register" },
];

export const interests = [
  "Gym Membership",
  "Basketball Academy",
  "Court Rental",
  "Wellness by URBN V",
  "Studio Rooms",
  "Movement by Sarvam",
  "Other",
];

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
