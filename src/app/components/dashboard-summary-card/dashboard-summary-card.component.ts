import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-summary-card',
  templateUrl: './dashboard-summary-card.component.html',
  styleUrls: ['./dashboard-summary-card.component.scss']
})


export class DashboardSummaryCardComponent implements OnInit {

  @Input() title: string;
  @Input() values: object;

  constructor() { }

  ngOnInit() {


  }

}
