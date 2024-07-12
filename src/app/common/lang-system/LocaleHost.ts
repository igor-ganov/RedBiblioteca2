import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

import { registerLocaleData } from '@angular/common';

import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

@Injectable({providedIn: 'root'})
export class LocaleHost {
  private observable;
  constructor(){
    this.observable = new ReplaySubject<string>(1);
  }
  setLanguage(lang: string) {
    this.current = lang.toLocaleLowerCase();
    this.setLocale(lang);
    this.observable.next(this.current);
  }
  setLocale(lang: string) {
    // registerLocaleData(localeDe, lang, localeDeExtra);

      switch (lang) {
        case 'en': {
          registerLocaleData(localeIt, 'it', localeItExtra);
          registerLocaleData(localeEn, 'en', localeEnExtra);
          registerLocaleData(localeFr, 'fr', localeFrExtra);
          registerLocaleData(localeRu, 'ru', localeRuExtra);
          break;
        }
        case 'it': {
          registerLocaleData(localeIt, 'it', localeItExtra);
            break;
        }
        case 'fr': {
          registerLocaleData(localeFr, 'fr', localeFrExtra);
            break;
        }
        case 'ru': {
        registerLocaleData(localeRu, 'ru', localeRuExtra);
            break;
        }
        default: {
          registerLocaleData(localeEn, 'en', localeEnExtra);
            break;
        }
    }
  }
  getLanguage() {return this.current;}
  private current: string = "en";
  getLanguageAsync(){
    return this.observable;
  }
}