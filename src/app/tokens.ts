import { InjectionToken } from "@angular/core";

export const VERSION = new InjectionToken<number>('VERSION', {
  providedIn: 'root',
  factory: () => 2,
});
