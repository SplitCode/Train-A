import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function validateRouteForm(
  control: AbstractControl,
): ValidationErrors | null {
  const stations = control.get('stations') as FormArray;
  const carriages = control.get('carriages') as FormArray;

  if (stations.length < 4 || carriages.length < 4) {
    return { minLength: true };
  }

  return null;
}
