import { Injectable } from '@angular/core';

import { base, expenseColors } from '../constants/api.constant';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  expenseColors: any;

  constructor(private apiService: APIService) {
    this.expenseColors = [];
  }

  fetchAllColors() {
    this.apiService.ajaxGet(base + expenseColors, {}).subscribe(data => {
      this.expenseColors = data.response;
    });
  }
}
