import { Injectable } from '@angular/core';

import { defaultLang, langResoucePath } from '../constants/language.constant';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang: string;
  langTexts: object;

  constructor(private apiService: APIService) {
    this.currentLang = defaultLang;
  }

  fetchLangTexts(datelang = this.currentLang) {
    this.apiService.ajaxGet(`${langResoucePath + this.currentLang}.json`, {}).subscribe(data => {
      this.langTexts = data.response;
    });
  }
}
