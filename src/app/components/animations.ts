import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('MainPage => Settings', [
      style({ position: 'relative' }),
      query(':leave, :enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '100%' })
      ]),
      group([
        query(':enter', [
          animate('300ms ease-out', style({ left: '0' }))
        ]),
        query(':leave', [
          animate('300ms ease-out', style({ left: '-100%' }))
        ]),
      ]),
    ]),

    transition('Settings => MainPage', [
      style({ position: 'relative' }),
      query(':leave, :enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      group([
        query(':enter', [
          animate('300ms ease-out', style({ left: '0' }))
        ]),
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
      ]),
    ]),
  ]);
