import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import * as moment from 'moment';
import * as querystring from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  ajaxGet(path, params) {
    return ajax({
      url: `${path}?${querystring.stringify(params)}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rxjs-is': 'Awesome!'
      }
    });
  }
}
