import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from '../../services/dashboard.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardYearlySummary: object;
  dashboardMonthlySummary: object;
  dashboardDailySummary: object;
  dashboardYearlyBubble: any;
  dashboardMonthlyBubble: any;
  dashboardDailyBubble: any;
  dashboardTexts: object;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private languageService: LanguageService
  ) {
    this.dashboardTexts = {};
  }

  ngOnInit() {
    const currentDate = this.route.snapshot.queryParamMap.get('date');
    this.dashboardService
      .fetchDashboardYearData(this.route.snapshot.queryParamMap.get('date'))
      .subscribe(data => {
        this.dashboardYearlySummary = this.dashboardService.getYearlySummary(
          data.response,
          currentDate
        );

        this.dashboardYearlyBubble = this.dashboardService.getYearlyBubble(
          data.response,
          currentDate
        );

        this.dashboardMonthlySummary = this.dashboardService.getMonthlySummary(
          data.response,
          currentDate
        );

        this.dashboardMonthlyBubble = this.dashboardService.getMonthlyBubble(
          data.response,
          currentDate
        );

        this.dashboardDailySummary = this.dashboardService.getDailySummary(
          data.response,
          currentDate
        );

        this.dashboardDailyBubble = this.dashboardService.getDailyBubble(
          data.response,
          currentDate
        );
      });

    setTimeout(() => {
      this.dashboardTexts = this.languageService.langTexts;
    });
  }
}
