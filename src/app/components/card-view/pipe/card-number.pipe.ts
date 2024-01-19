import { Pipe, PipeTransform } from '@angular/core';
import { CreditCard } from "../../../models/credit-card";

@Pipe({
  name: 'cardNumber',
  standalone: true
})
export class CardNumberPipe implements PipeTransform {

  transform(card: CreditCard): string {
    if(card.cardNumber) {
      return `${card.cardNumber.at(0)} * ${card.cardNumber.slice(-4)}`;
    }
    return ''
  }

}
