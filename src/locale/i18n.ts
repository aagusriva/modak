import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {resources} from './resources';

// Getting current language of device to set it on our app
const deviceLanguage = RNLocalize.getLocales();
const currentLanguage = deviceLanguage[0].languageCode;

// Initializing i18n configuration so app has translation
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: currentLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
