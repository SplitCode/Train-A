import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CarriageItem } from '../../models/carriage-item.interface';
import { uniqueCarriageNameValidator } from '../../utilits/carriage-name.validator';

export function createCarriageForm(
  fb: FormBuilder,
  store: Store,
  currentMode: 'create' | 'update',
  foundedCarriage?: CarriageItem,
): FormGroup {
  return fb.group({
    name: [
      foundedCarriage?.name,
      [
        Validators.required,
        uniqueCarriageNameValidator(
          store,
          currentMode,
          foundedCarriage?.name || '',
        ),
      ],
    ],
    rows: [foundedCarriage?.rows, [Validators.required]],
    leftSeats: [foundedCarriage?.leftSeats, [Validators.required]],
    rightSeats: [foundedCarriage?.rightSeats, [Validators.required]],
  });
}
