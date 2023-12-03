import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from "./components/settings/settings.component";
import { CardsListComponent } from "./components/cards-list/cards-list.component";
import { PasswordsListComponent } from "./components/passwords-list/passwords-list.component";

const routes: Routes = [
    {
        path: 'settings', component: SettingsComponent,
        data: { animation: 'Settings' }
    },
    {
        path: 'passwords-list', component: PasswordsListComponent,
        data: { animation: 'PasswordsList' }
    },
    {
        path: 'cards-list', component: CardsListComponent,
        data: { animation: 'CardsList' }
    },
    {
        path: 'add-new-card',
        loadChildren: () => import('./components/add-new-card/add-new-card.component').then(m => m.AddNewCardComponent),
        data: { animation: 'AddNewCard' }
    },
    {
        path: '**', redirectTo: 'cards-list',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
