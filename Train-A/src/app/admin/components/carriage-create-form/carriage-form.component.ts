import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFormVisibleForCarriageCode,
  selectMode,
} from '../../../redux/selectors/carriage.selectors';
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
import {
  createCarriage,
  updateCarriage,
} from '../../../redux/actions/carriage.actions';

@Component({
  selector: 'app-carriage-form',
  templateUrl: './carriage-form.component.html',
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
export class CarriageFormComponent implements OnInit {
  public updateCode$!: Observable<string | null>;

  private createCode: ShortUniqueId = new ShortUniqueId({ length: 7 });

  public mode$!: Observable<'create' | 'update'>;

  public carriageForm: FormGroup;

  public isVisible: boolean = false;

  public currentMode: string = 'update';

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.carriageForm = this.launchCarriageForm;
  }

  public ngOnInit() {
    this.updateCode$ = this.store.select(selectFormVisibleForCarriageCode);
    this.updateCode$.subscribe((code) => {
      this.isVisible = code !== null;
    });
    this.mode$ = this.store.select(selectMode);
    this.mode$.subscribe((mode) => {
      this.currentMode = mode;
    });
  }

  private get launchCarriageForm() {
    return this.fb.group({
      code: [this.createCode.rnd()],
      rows: [0, [Validators.required]],
      leftSeats: [0, [Validators.required]],
      rightSeats: [0, [Validators.required]],
    });
  }

  public closeDialog(): void {
    this.carriageForm.reset(this.launchCarriageForm.value);
    this.isVisible = false;
  }

  private updateCarriage(): void {
    this.store.dispatch(
      updateCarriage({ updatedCarriage: this.carriageForm.value }),
    );
  }

  private createCarriage(): void {
    this.store.dispatch(
      createCarriage({ createdCarriage: this.carriageForm.value }),
    );
  }

  private processCarriages(): void {
    if (this.currentMode === 'update') {
      this.updateCarriage();
    } else {
      this.createCarriage();
    }
  }

  public onSubmit(): void {
    if (this.carriageForm.valid) {
      this.processCarriages();
      this.closeDialog();
    } else {
      console.log('Form is invalid');
    }
  }
}
