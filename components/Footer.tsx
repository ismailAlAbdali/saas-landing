'use client';

import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#0449a9] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">SaaS</h3>
            <p className="text-sm opacity-80">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-[#ffe741]" title={t('footer.social.twitter')}>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-[#ffe741]" title={t('footer.social.github')}>
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-[#ffe741]" title={t('footer.social.linkedin')}>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="opacity-80 hover:opacity-100 hover:text-[#ffe741]"
                >
                  {t('common.features')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="opacity-80 hover:opacity-100 hover:text-[#ffe741]"
                >
                  {t('common.pricing')}
                </button>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.documentation')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.updates')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.careers')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.privacy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.terms')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.security')}
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#ffe741]">
                  {t('common.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} SaaS Platform. {t('common.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}