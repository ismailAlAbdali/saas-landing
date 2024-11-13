'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import i18nInstance from '@/app/i18n/client';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    if (i18nInstance.language !== savedLang) {
      i18nInstance.changeLanguage(savedLang).then(() => {
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = savedLang;
      });
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18nInstance.language === 'en' ? 'ar' : 'en';
    i18nInstance.changeLanguage(newLang).then(() => {
      localStorage.setItem('preferred-language', newLang);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative"
      title={i18nInstance.language === 'en' ? 'التحويل للعربية' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Toggle language</span>
      <span className="absolute -bottom-1 right-0 text-xs font-bold">
        {i18nInstance.language === 'en' ? 'ع' : 'En'}
      </span>
    </Button>
  );
}