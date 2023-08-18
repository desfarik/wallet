import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CreditCard {
  title: string;
  pin: string;
  currency?: string;
  paymentType?: string;
  bank?: string;
}

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent {

  cards: CreditCard[] = [
    {
      title: "Card 1",
      pin: "1234",
      currency: 'USD'
    },
    {
      title: "Card 2",
      pin: "2525",
      currency: 'BYN'
    },
    {
      title: "Card 3",
      pin: "1234",
      currency: 'USD'
    },
    {
      title: "Card 4",
      pin: "2525",
      currency: 'BYN'
    },

  ]
}
