import { createContext, useContext } from 'react';

export const I18nContext = createContext({ language: 'en', setLanguage: () => {}, tr: value => value });
export const useI18n = () => useContext(I18nContext);
