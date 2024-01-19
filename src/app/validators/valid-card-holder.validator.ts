import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validCardHolder(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const isError = !/^[a-zA-Z]+ [a-zA-Z]+$/g.test(control.value);
      return isError ? {
        validCardHolder: { value: control.value }
      } : null;
    }
    return null;
  };
}
