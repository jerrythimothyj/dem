import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';

import { defaultLang } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang: string;
  langTexts: object;

  constructor() {
    this.currentLang = defaultLang;
  }

  getLangTexts(lang = this.currentLang) {
    this.currentLang = lang;

    ajax('./assets/language/' + this.currentLang + '.json').subscribe(data => {
      this.langTexts = data.response;
    });
  }
}
