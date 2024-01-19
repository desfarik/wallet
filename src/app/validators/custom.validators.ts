import { validDate } from "./valid-date.validator";
import { dateMin } from "./date-min.validator";
import { validCardHolder } from "./valid-card-holder.validator";

export const CustomValidators = {
  dateMin: dateMin,
  validDate: validDate,
  validCardHolder: validCardHolder,
}
