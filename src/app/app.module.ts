import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { provideRouter, RouterLink, RouterOutlet, withComponentInputBinding } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAngularSvgIcon } from "angular-svg-icon";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
  ],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideAngularSvgIcon()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
