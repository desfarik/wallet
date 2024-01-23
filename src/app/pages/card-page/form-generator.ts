import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreditCardFormModel } from "./card-form/card-form.component";
import { CustomValidators } from "../../validators/custom.validators";

export function generateForm() {
  return new FormGroup<CreditCardFormModel>({
      label: new FormControl('', Validators.required),
      currency: new FormControl('BYN'),
      cardNumber: new FormControl('', [Validators.minLength(16)]),
      pin: new FormControl('', [Validators.minLength(4)]),
      cardHolder: new FormControl('', [CustomValidators.validCardHolder()]),
      expiryDate: new FormControl('', [CustomValidators.dateMin(), CustomValidators.validDate()]),
      CVV: new FormControl('', Validators.minLength(3)),
      color: new FormControl('#29b6f6'),
      previewType: new FormControl(0),
    }
  )
}
