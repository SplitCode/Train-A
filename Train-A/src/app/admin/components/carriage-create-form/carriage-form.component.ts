import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
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
import { uniqueCarriageNameValidator } from '../../utilits/carriage-name.validator';

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
export class CarriageFormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

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

    const subscriptions = combineLatest([
      this.currentCode$,
      this.mode$,
    ]).subscribe(([code, mode]) => {
      console.log('code', code, 'mode', mode);
      this.isVisible = code !== null;
      this.currentMode = mode;
      if (code) {
        this.currentCode = code;
        console.log('[currentCode]', this.currentCode);
        this.foundedCarriage$ = this.store.select(selectCarriageByCode(code));
        this.foundedCarriage$.subscribe((foundedCarriage) => {
          this.form = this.createCarriageForm(foundedCarriage);
          console.log(this.form.value);
        });
      }
    });
    this.subscriptions.add(subscriptions);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public get title(): string {
    return this.currentMode === 'create'
      ? 'Create Carriage: '
      : 'Update Carriage: ';
  }

  private createCarriageForm(foundedCarriage?: CarriageItem): FormGroup {
    return this.fb.group({
      name: [
        foundedCarriage?.name,
        [
          Validators.required,
          ,
          uniqueCarriageNameValidator(
            this.store,
            this.currentMode,
            foundedCarriage?.name || '',
          ),
        ],
      ],
      rows: [foundedCarriage?.rows, [Validators.required]],
      leftSeats: [foundedCarriage?.leftSeats, [Validators.required]],
      rightSeats: [foundedCarriage?.rightSeats, [Validators.required]],
    });
  }

  public closeDialog(): void {
    this.form.reset();
    this.store.dispatch(
      showCarriageForm({
        carriageCode: null,
        mode: this.currentMode,
      }),
    );
    console.log(this.form.value);
  }

  private updateCarriage(): void {
    const carriage = { ...this.form.value, code: this.currentCode };
    this.store.dispatch(updateCarriage({ carriage }));
    console.log(carriage);
  }

  private createCarriage(): void {
    this.store.dispatch(createCarriage({ carriage: this.form.value }));
  }

  private processCarriages(): void {
    console.log(this.currentMode);
    if (this.currentMode === 'update') {
      this.updateCarriage();
    } else {
      this.createCarriage();
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.processCarriages();
    }
  }
}
