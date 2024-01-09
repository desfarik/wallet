import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CreditCard } from "../../../models/credit-card";

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardViewComponent {
  @Input() card!: CreditCard;

  @HostBinding('style.background-color') get color() {
    return this.card.color
  }

}
