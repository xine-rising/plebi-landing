import en from './en.json';

type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

const translations: Record<string, typeof en> = { en };

export function t(key: TranslationKey, locale: string = 'en'): string {
  const strings = translations[locale] ?? translations.en;
  const parts = key.split('.');
  let value: unknown = strings;
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key; // Fallback to key if not found
    }
  }
  return typeof value === 'string' ? value : key;
}
