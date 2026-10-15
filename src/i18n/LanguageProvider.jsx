import { useEffect, useMemo, useState } from 'react';
import { I18nContext } from './context';
import pt from './pt.json';

const normalize = value => value.replace(/\s+/g, ' ').trim();
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-language');
      if (saved === 'pt' || saved === 'en') return saved;
    } catch { /* Browser storage is optional. */ }
    return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  });
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem('portfolio-language', language); } catch { /* Optional storage. */ }
  }, [language]);
  const value = useMemo(() => {
    const number = input => new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 3 }).format(input);
    const tr = input => {
      if (Array.isArray(input)) return input.map(tr);
      if (typeof input !== 'string') return input;
      const key = normalize(input);
      if (language === 'en' || !Object.hasOwn(pt, key)) return input;
      return input.replace(/\S[\s\S]*\S|\S/, () => pt[key]);
    };
    return { language, setLanguage, tr, number };
  }, [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
