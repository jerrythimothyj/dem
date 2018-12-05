import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as R from 'ramda';

import { base, dashBoardYear } from '../constants/api.constant';
import {
  SPENDINGS_TYPE_EARNINGS,
  SPENDINGS_TYPE_SPENDINGS,
  DATE_FORMAT
} from '../constants/global';
import { APIService } from './api.service';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  defaultDate: string;

  constructor(
    private apiService: APIService,
    private mathService: MathService
  ) {
    this.defaultDate = moment().format(DATE_FORMAT);
  }

  fetchDashboardYearData(date = this.defaultDate) {
    return this.apiService.ajaxGet(base + dashBoardYear, {
      date
    });
  }

  getCurrentAmount(filter, data) {
    return this.mathService.roundTo2Decimals(
      R.pipe(
        R.filter(filter),
        R.pluck('amount'),
        R.sum
      )(data)
    );
  }

  getYearlySummary(data, date) {
    const currentYear = moment(date, DATE_FORMAT).year();

    const getCurrentYearEarnings = row =>
      row.date_yyyy === currentYear &&
      row.spending_type === SPENDINGS_TYPE_EARNINGS;

    const getCurrentYearSpendings = row =>
      row.date_yyyy === currentYear &&
      row.spending_type === SPENDINGS_TYPE_SPENDINGS;

    const currentEarnings = this.getCurrentAmount(getCurrentYearEarnings, data);

    const currentSpendings = this.getCurrentAmount(
      getCurrentYearSpendings,
      data
    );

    const currentRemainings = this.mathService.roundTo2Decimals(
      R.subtract(currentEarnings, currentSpendings)
    );

    return {
      currentEarnings,
      currentSpendings,
      currentRemainings
    };
  }

  getMonthlySummary(data, date) {
    const currentYear = moment(date, DATE_FORMAT).year();
    const currentMonth = moment(date, DATE_FORMAT).month();

    const getCurrentMonthEarnings = row =>
      row.date_yyyy === currentYear &&
      row.date_mm === currentMonth &&
      row.spending_type === SPENDINGS_TYPE_EARNINGS;

    const getCurrentMonthSpendings = row =>
      row.date_yyyy === currentYear &&
      row.date_mm === currentMonth &&
      row.spending_type === SPENDINGS_TYPE_SPENDINGS;

    const currentEarnings = this.getCurrentAmount(
      getCurrentMonthEarnings,
      data
    );

    const currentSpendings = this.getCurrentAmount(
      getCurrentMonthSpendings,
      data
    );

    const currentRemainings = this.mathService.roundTo2Decimals(
      R.subtract(currentEarnings, currentSpendings)
    );

    return {
      currentEarnings,
      currentSpendings,
      currentRemainings
    };
  }

  getDailySummary(data, date) {
    const currentYear = moment(date, DATE_FORMAT).year();
    const currentMonth = moment(date, DATE_FORMAT).month();
    const currentDay = moment(date, DATE_FORMAT).day();

    const getCurrentDayEarnings = row =>
      row.date_yyyy === currentYear &&
      row.date_mm === currentMonth &&
      row.date_dd === currentDay &&
      row.spending_type === SPENDINGS_TYPE_EARNINGS;

    const getCurrentDaySpendings = row =>
      row.date_yyyy === currentYear &&
      row.date_mm === currentMonth &&
      row.date_dd === currentDay &&
      row.spending_type === SPENDINGS_TYPE_SPENDINGS;

    const currentEarnings = this.getCurrentAmount(getCurrentDayEarnings, data);

    const currentSpendings = this.getCurrentAmount(
      getCurrentDaySpendings,
      data
    );

    const currentRemainings = this.mathService.roundTo2Decimals(
      R.subtract(currentEarnings, currentSpendings)
    );

    return {
      currentEarnings,
      currentSpendings,
      currentRemainings
    };
  }
}
