'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative"
      title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Toggle language</span>
      <span className="absolute -bottom-1 right-0 text-xs font-bold">
        {i18n.language === 'en' ? 'ع' : 'En'}
      </span>
    </Button>
  );
}