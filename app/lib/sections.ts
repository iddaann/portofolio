export const sectionIds = {
  hero: "hero",
  intro: "intro",
  works: "works",
  tech: "tech",
  galaxy: "idan-marker",
  journey: "journey",
  about: "about",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
