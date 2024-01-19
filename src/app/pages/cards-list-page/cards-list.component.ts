import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardStoreService } from "../../service/card-store.service";
import { CardViewComponent } from "../../components/card-view/card-view.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardViewComponent,
    RouterLink,
    RouterLinkActive,
  ],
  standalone: true
})
export class CardsListComponent {

  cardStore = inject(CardStoreService);

    protected readonly Object = Object;
}
