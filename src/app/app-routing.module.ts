import { Routes } from '@angular/router';
import { CardsListComponent } from "./components/cards-list/cards-list.component";

export const routes: Routes = [
  {
    path: '',
    component: CardsListComponent,
    data: { animation: 'CardsList' }
  },
  {
    path: 'add-new-card',
    loadComponent: () => import('./components/add-new-card/add-new-card.component').then(m => m.AddNewCardComponent),
    data: { animation: 'AddNewCard' }
  },
  {
    path: '**', redirectTo: '',
  },
];
