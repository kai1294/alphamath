import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from "./assets/lang";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        detection: {
            order: ["localStorage", "navigator"],
        },
    });

export default i18n;
