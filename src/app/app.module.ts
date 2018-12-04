import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { LanguageService } from './services/language.service';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ExpensesComponent } from './containers/expenses/expenses.component';
import { BudgetComponent } from './containers/budget/budget.component';
import { ComparisonComponent } from './containers/comparison/comparison.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { LogoutComponent } from './containers/logout/logout.component';
import { RegistrationComponent } from './containers/registration/registration.component';
import { ForgotPasswoRdComponent } from './containers/forgot-passwo-rd/forgot-passwo-rd.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { SearchComponent } from './containers/search/search.component';
import { GroupedBarChartComponent } from './components/graphs/grouped-bar-chart/grouped-bar-chart.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses:id', component: ExpensesComponent },
  { path: 'budget:id', component: BudgetComponent },
  { path: 'comparison:id', component: ComparisonComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    DashboardComponent,
    ExpensesComponent,
    BudgetComponent,
    ComparisonComponent,
    SettingsComponent,
    LogoutComponent,
    RegistrationComponent,
    ForgotPasswoRdComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SearchComponent,
    GroupedBarChartComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private languageService: LanguageService) {
    languageService.getLangTexts();
  }
}
