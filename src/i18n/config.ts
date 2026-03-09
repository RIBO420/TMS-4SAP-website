export const languages = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;
