import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  roundTo2Decimals(num) {
    return Math.round(num * 100) / 100;
  }
}
