import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [

    transition('CardsList => AddNewCard', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: '100%',
          left: '0',
          width: '100%'
        })
      ]),
      query(':leave', [
        style({
          position: 'absolute',
          left: '1rem',
          width: 'calc(100% - 2rem)'
        })
      ]),
      group([
        query(':enter', [
          animate('250ms ease-in', style({ top: '0' }))
        ]),
      ]),
    ]),

    transition('AddNewCard => CardsList', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':leave', [
        style({width: '100vw'})
      ]),
      query(':enter', [
        style({
          position: 'absolute',
          left: '1rem',
          top: '1.5rem',
          width: 'calc(100% - 2rem)'
        })
      ]),
      group([
        query(':leave', [
          animate('250ms ease-out', style({ top: '100%' }))
        ]),
      ]),
    ]),
  ]);
