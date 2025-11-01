import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocale = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const next = i18n.language === 'ja' ? 'en' : 'ja';
    void i18n.changeLanguage(next);
  }, [i18n]);

  return {
    language: i18n.language,
    toggleLanguage
  };
};
