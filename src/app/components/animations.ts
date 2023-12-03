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

    transition('CardsList => AddNewCard', [
      style({ position: 'relative' }),
      query(':leave, :enter', [
        style({
          position: 'absolute',
          top: '0',
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '100%', left: '-1rem', width: '100vw'})
      ]),
      group([
        query(':enter', [
          animate('250ms ease-out', style({ top: '0' }))
        ]),
      ]),
    ]),

    transition('AddNewCard => CardsList', [
      style({ position: 'relative' }),
      query(':leave, :enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':leave', [
        style({left: '-1rem', width: '100vw'})
      ]),
      group([
        query(':leave', [
          animate('250ms ease-in', style({ top: '100%' }))
        ]),
      ]),
    ]),
  ]);
