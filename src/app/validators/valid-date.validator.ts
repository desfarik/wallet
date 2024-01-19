import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length === 4) {
      const [month, year] = control.value.match(/.{1,2}/g) as [string, string];
      const isError = +month > 12;
      return isError ? {
        validDate: { value: control.value }
      } : null;
    }
    return null;
  };
}
