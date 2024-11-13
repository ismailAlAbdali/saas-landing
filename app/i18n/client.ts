'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import { getOptions } from './settings';

const i18nInstance = i18next.createInstance();

if (!i18next.isInitialized) {
  i18nInstance
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...getOptions(),
      resources: {
        ar: { translation: arTranslations },
        en: { translation: enTranslations }
      },
      detection: {
        order: ['localStorage', 'htmlTag', 'path', 'navigator'],
        lookupLocalStorage: 'preferred-language',
        caches: ['localStorage'],
      },
      fallbackLng: 'ar',
    });
}

export default i18nInstance;