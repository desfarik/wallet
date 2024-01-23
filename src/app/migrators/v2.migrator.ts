import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from "@ng-web-apis/common";
import { Migrator } from "./migrators.service";
import { CreditCard } from "@models/credit-card";

interface V1Card {
  color: string;
  id: number;
  name: string;
  pin: string;
}

@Injectable()
export class V2Migrator implements Migrator {

  storage = inject(LOCAL_STORAGE)

  migrate() {
    const v1cards = JSON.parse(this.storage.getItem('user_cards') || '[]') as V1Card[];
    if (v1cards.length === 0) {
      return;
    }

    const v2cards = v1cards.map(card => {
      return {
        id: String(card.id),
        label: card.name,
        currency: 'BYN',
        color: card.color,
        previewType: 0,
        pin: card.pin,
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        CVV: '',
      } as CreditCard
    })

    this.storage.setItem('cards', JSON.stringify(v2cards));
    this.storage.removeItem('user_cards');
  }
}
