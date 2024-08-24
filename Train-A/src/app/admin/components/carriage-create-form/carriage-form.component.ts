import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
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
  private currentCode$!: Observable<string | null>;

  public currentCode: string = '';

  private mode$!: Observable<'create' | 'update'>;

  private currentMode: 'create' | 'update' = 'update';

  public form: FormGroup;

  public isVisible: boolean = false;

  private foundedCarriage$?: Observable<CarriageItem | undefined>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.form = this.createCarriageForm();
  }

  public ngOnInit() {
    this.currentCode$ = this.store.select(selectFormVisibleForCarriageCode);
    this.mode$ = this.store.select(selectMode);

    combineLatest([this.currentCode$, this.mode$]).subscribe(([code, mode]) => {
      this.isVisible = code !== null;
      this.currentMode = mode;
      if (code) {
        this.currentCode = code;
        console.log('[currentCode]', this.currentCode);
        this.foundedCarriage$ = this.store.select(selectCarriageByCode(code));
        this.foundedCarriage$.subscribe((foundedCarriage) => {
          this.form = this.createCarriageForm(foundedCarriage);
        });
      }
    });
  }

  public get title(): string {
    return this.currentMode === 'create'
      ? 'Create Carriage: '
      : 'Update Carriage: ';
  }

  private createCarriageForm(foundedCarriage?: CarriageItem): FormGroup {
    return this.fb.group({
      name: [foundedCarriage?.name, [Validators.required]],
      rows: [foundedCarriage?.rows, [Validators.required]],
      leftSeats: [foundedCarriage?.leftSeats, [Validators.required]],
      rightSeats: [foundedCarriage?.rightSeats, [Validators.required]],
    });
  }

  // Неудобно, что для закрытия надо в carriageCode: null, надо более наглядно сделать
  public closeDialog(): void {
    console.log(this.form.value);
    this.form.reset();
    this.store.dispatch(
      showCarriageForm({ carriageCode: null, mode: this.currentMode }),
    );
    console.log(this.form.value);
  }

  private updateCarriage(): void {
    this.store.dispatch(updateCarriage({ carriage: this.form.value }));
  }

  private createCarriage(): void {
    this.store.dispatch(createCarriage({ carriage: this.form.value }));
  }

  private processCarriages(): void {
    if (this.currentMode === 'update') {
      this.updateCarriage();
    } else {
      this.createCarriage();
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.processCarriages();
      this.closeDialog();
    } else {
      console.log('Form is invalid');
    }
  }
}
