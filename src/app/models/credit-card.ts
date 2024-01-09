export interface CreditCard {
  id: string;
  label: string;
  currency: string;
  pin?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  CVV?: string;
  color?: string;
}
