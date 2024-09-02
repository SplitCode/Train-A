import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function validateRouteForm(
  control: AbstractControl,
): ValidationErrors | null {
  const stations = control.get('stations') as FormArray;
  const carriages = control.get('carriages') as FormArray;

  const errors: ValidationErrors = {};

  if (stations.length < 4) {
    errors['stationsMinLength'] = true;
  }

  if (carriages.length < 4) {
    errors['carriagesMinLength'] = true;
  }

  return Object.keys(errors).length ? errors : null;
}
