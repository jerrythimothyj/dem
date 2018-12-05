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
          [],
          currentDate
        );

        this.dashboardMonthlySummary = this.dashboardService.getMonthlySummary(
          [],
          currentDate
        );

        this.dashboardDailySummary = this.dashboardService.getDailySummary(
          [],
          currentDate
        );
      });

    setTimeout(() => {
      this.dashboardTexts = this.languageService.langTexts;
    });
  }
}
