import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopNavBarComponent } from "./components/top-nav-bar/top-nav-bar.component";
import { LanguageService } from "./services/language.service";

@NgModule({
  declarations: [AppComponent, TopNavBarComponent],
  imports: [NgbModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private languageService: LanguageService) {
    languageService.getLangTexts();
  }
}
