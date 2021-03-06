import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { LanguageService } from '../../services/language.service';
import {DATE_FORMAT} from '../../constants/global';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  topNavbarTexts: object;
  defaultDate: string;
  isNavbarCollapsed: boolean;

  constructor(private languageService: LanguageService) {
    this.topNavbarTexts = {};
    this.defaultDate = moment().format(DATE_FORMAT);
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.topNavbarTexts = this.languageService.langTexts;
    });
  }
}
