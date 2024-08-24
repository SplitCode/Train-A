import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectCarriageByName } from '../../redux/selectors/carriage.selectors';

export function uniqueCarriageNameValidator(
  store: Store,
  currentMode: 'create' | 'update',
  currentName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      !control.value ||
      (currentMode === 'update' && control.value === currentName)
    ) {
      return null;
    }

    let isNameTaken = false;

    store
      .select(selectCarriageByName(control.value))
      .pipe(take(1))
      .subscribe((carriage) => {
        if (carriage) {
          isNameTaken = true;
        }
      });

    return isNameTaken ? { nameTaken: true } : null;
  };
}
