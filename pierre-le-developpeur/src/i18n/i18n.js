import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import fr from "./fr/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});

export default i18n;
