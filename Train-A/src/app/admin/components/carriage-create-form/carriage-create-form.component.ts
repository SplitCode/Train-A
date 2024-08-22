import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFormVisibleForCarriageCode } from '../../../redux/selectors/carriage.selectors';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-carriage-create-form',
  templateUrl: './carriage-create-form.component.html',
  standalone: true,
  imports: [
    CustomButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    PRIME_NG_MODULES.InputNumberModule,
    PRIME_NG_MODULES.FieldsetModule,
  ],
})
export class CarriageCreateFormComponent implements OnInit {
  public formVisibleForCarriageCode$!: Observable<string | null>;

  public createCarriageForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.createCarriageForm = this.launchCreateCarriageForm;
  }

  public ngOnInit() {
    this.formVisibleForCarriageCode$ = this.store.select(
      selectFormVisibleForCarriageCode,
    );
  }

  private get launchCreateCarriageForm() {
    return this.fb.group({
      rows: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
      leftSeats: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
      rightSeats: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
    });
  }

  public onSubmit(): void {
    console.log('submit carriages form');
  }
}
