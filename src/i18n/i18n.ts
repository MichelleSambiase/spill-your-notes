import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import EN_translation from '../locale/en/translation.json'
import ES_translation from '../locale/es/translation.json'

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation:  EN_translation
     
    },
    es: {
      translation: ES_translation
      
    }
 }, 
 lng: "en",  
});


export default i18n