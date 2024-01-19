import { Routes } from '@angular/router';
import { CardsListComponent } from "./pages/cards-list-page/cards-list.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cards-list-page/cards-list.component').then(m => m.CardsListComponent),
    data: { animation: 'CardsList' }
  },
  {
    path: 'card/create',
    loadComponent: () => import('./pages/card-page/create-card/create-card.component').then(m => m.CreateCardComponent),
    data: { animation: 'AddNewCard' }
  },
  {
    path: 'card/edit/:id',
    loadComponent: () => import('./pages/card-page/edit-card/edit-card.component').then(m => m.EditCardComponent),
    data: { animation: 'AddNewCard' }
  },
  {
    path: '**', redirectTo: '',
  },
];
