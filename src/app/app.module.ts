import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { CardsListComponent } from "./components/cards-list/cards-list.component";
import { provideRouter, RouterLink, RouterOutlet } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    CardsListComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [
    provideRouter(routes),
    provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
