import { AbstractControl } from '@angular/forms';

export interface CustomValidationInfoConfig {
  control: AbstractControl | null;
  requiredMessage?: string;
  validMessage?: string;
  errorMessages?: { [key: string]: string }[];
  customErrorMessages?: { [key: string]: string };
  initialMessage?: string;
}
