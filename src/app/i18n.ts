import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const STORAGE_KEY = "app-lang";

export const defaultNS = "translation";
export const resources = {
  en: { [defaultNS]: en },
  ru: { [defaultNS]: ru },
} as const;

export type SupportedLocale = keyof typeof resources;

export const supportedLocales: SupportedLocale[] = ["en", "ru"];

function getInitialLanguage(): SupportedLocale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
    if (stored && supportedLocales.includes(stored)) return stored;
    const browser = navigator.language.split("-")[0];
    if (browser === "ru") return "ru";
  } catch {
    // localStorage not available (e.g. in test env)
  }
  return "en";
}

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  try {
    if (
      typeof window !== "undefined" &&
      typeof localStorage?.setItem === "function"
    ) {
      localStorage.setItem(STORAGE_KEY, lng);
    }
  } catch {
    // ignore
  }
});

export default i18n;
