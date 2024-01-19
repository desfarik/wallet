import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateMin(date: Date = new Date()): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length === 4) {
      const [month, year] = control.value.match(/.{1,2}/g) as [string, string];
      const expiryDate = new Date(2000 + +year, +month - 1);
      const isError = expiryDate < new Date();
      return isError ? {
        dateMin: { value: control.value }
      } : null;
    }
    return null;
  };
}
