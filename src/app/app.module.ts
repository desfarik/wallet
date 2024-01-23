import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { provideRouter, RouterLink, RouterOutlet, withComponentInputBinding } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAngularSvgIcon, SvgIconComponent } from "angular-svg-icon";
import { HttpClientModule } from "@angular/common/http";
import { provideServiceWorker } from '@angular/service-worker';
import { provideDataMigration } from "./migrators/migrators.service";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

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
    SvgIconComponent,
  ],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAngularSvgIcon(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideDataMigration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
