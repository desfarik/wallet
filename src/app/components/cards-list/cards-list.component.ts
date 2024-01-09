import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardStoreService } from "../../service/card-store.service";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent {

  cardStore = inject(CardStoreService);

}
