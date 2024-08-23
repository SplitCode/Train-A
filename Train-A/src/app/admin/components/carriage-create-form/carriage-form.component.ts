import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  selectCarriageByCode,
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
import {
  createCarriage,
  showCarriageForm,
  updateCarriage,
} from '../../../redux/actions/carriage.actions';
import { CarriageItem } from '../../models/carriage-item.interface';

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

  private mode$!: Observable<'create' | 'update'>;

  public carriageForm: FormGroup;

  public isVisible: boolean = false;

  private currentMode: 'create' | 'update' = 'update';

  private foundedCarriage$?: Observable<CarriageItem | undefined>;

  private foundedCarriage?: CarriageItem | undefined;

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
      if (code) {
        this.foundedCarriage$ = this.store.select(selectCarriageByCode(code));
      }
    });
    if (this.foundedCarriage$) {
      this.foundedCarriage$.subscribe((foundedCarriage) => {
        this.foundedCarriage = foundedCarriage;
      });
    }
    this.mode$ = this.store.select(selectMode);
    this.mode$.subscribe((mode) => {
      this.currentMode = mode;
    });
  }

  public get title(): string {
    return this.currentMode === 'create'
      ? 'Create Carriage: '
      : 'Update Carriage: ';
  }

  private get launchCarriageForm() {
    return this.fb.group({
      code: [this.foundedCarriage?.code],
      rows: [0, [Validators.required]],
      leftSeats: [0, [Validators.required]],
      rightSeats: [0, [Validators.required]],
    });
  }

  // Неудобно, что для закрытия надо в carriageCode: null, надо более наглядно сделать
  public closeDialog(): void {
    this.carriageForm.reset(this.launchCarriageForm.value);
    this.store.dispatch(
      showCarriageForm({
        carriageCode: null,
        mode: this.currentMode,
      }),
    );
  }

  private updateCarriage(): void {
    this.store.dispatch(updateCarriage({ carriage: this.carriageForm.value }));
  }

  private createCarriage(): void {
    this.store.dispatch(createCarriage({ carriage: this.carriageForm.value }));
  }

  private processCarriages(): void {
    if (this.currentMode === 'update') {
      this.updateCode$.pipe(take(1)).subscribe((code) => {
        if (code) {
          this.carriageForm.patchValue({ code });
          this.updateCarriage();
        }
      });
    } else {
      this.carriageForm.patchValue({ code: this.foundedCarriage?.code });
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
