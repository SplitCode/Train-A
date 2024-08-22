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
import { CarriageItemComponent } from '../carriage-item/carriage-item.component';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-carriage-create-form',
  templateUrl: './carriage-create-form.component.html',
  standalone: true,
  imports: [
    CustomButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    PRIME_NG_MODULES.InputNumberModule,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.InputTextModule,
    CarriageItemComponent,
  ],
})
export class CarriageCreateFormComponent implements OnInit {
  public formVisibleForCarriageCode$!: Observable<string | null>;

  public createCarriageForm: FormGroup;

  public visible: boolean = false;

  private shortUuid: ShortUniqueId = new ShortUniqueId({ length: 7 });

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
    this.formVisibleForCarriageCode$.subscribe((code) => {
      this.visible = code !== null;
    });
  }

  private get launchCreateCarriageForm() {
    return this.fb.group({
      code: [this.shortUuid.rnd()],
      rows: [0, [Validators.required]],
      leftSeats: [0, [Validators.required]],
      rightSeats: [0, [Validators.required]],
    });
  }

  public closeDialog(): void {
    console.log(this.createCarriageForm.value);
    this.createCarriageForm = this.launchCreateCarriageForm;
    // this.store.dispatch(resetFormVisibleForCarriageCode());
  }

  public onSubmit(): void {
    console.log('submit carriages form');
  }
}
