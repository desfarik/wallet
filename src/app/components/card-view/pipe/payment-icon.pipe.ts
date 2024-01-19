import { Pipe, PipeTransform } from '@angular/core';
import { CreditCard } from "../../../models/credit-card";

@Pipe({
  name: 'paymentIcon',
  standalone: true
})
export class PaymentIconPipe implements PipeTransform {

  transform(card: CreditCard): string {
    const cardNumber = card.cardNumber;
    if(cardNumber) {
      if(cardNumber.startsWith('4')) {
        return 'visa';
      }
      if(cardNumber.startsWith('5')) {
        return 'mastercard'
      }
      if(cardNumber.startsWith('60') || cardNumber.startsWith('62')) {
        return 'unionpay'
      }
    }
    return '';
  }

}
