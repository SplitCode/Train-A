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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { CarriageItemComponent } from '../carriage-item/carriage-item.component';
import {
  createCarriage,
  showCarriageForm,
  updateCarriage,
} from '../../../redux/actions/carriage.actions';
import { CarriageItem } from '../../models/carriage-item.interface';
import { createCarriageForm } from './create.carriage.form';

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

  public currentMode: 'create' | 'update' = 'update';

  public form: FormGroup;

  public isVisible: boolean = false;

  private foundedCarriage$?: Observable<CarriageItem | undefined>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.form = createCarriageForm(this.fb, this.store, this.currentMode);
  }

  public ngOnInit() {
    this.turnObservables();
    this.turnubscriptions();
  }

  private turnObservables(): void {
    this.currentCode$ = this.store.select(selectFormVisibleForCarriageCode);
    this.mode$ = this.store.select(selectMode);
  }

  private turnubscriptions(): void {
    const subscriptions = combineLatest([
      this.currentCode$,
      this.mode$,
    ]).subscribe(([code, mode]) => {
      this.handleCodeAndModeChange(code, mode);
    });
    this.subscriptions.add(subscriptions);
  }

  private handleCodeAndModeChange(
    code: string | null,
    mode: 'create' | 'update',
  ): void {
    this.isVisible = code !== null;
    this.currentMode = mode;
    if (code) {
      this.currentCode = code;
      this.foundedCarriage$ = this.store.select(selectCarriageByCode(code));
      this.foundedCarriage$.subscribe((foundedCarriage) => {
        this.form = createCarriageForm(
          this.fb,
          this.store,
          this.currentMode,
          foundedCarriage,
        );
      });
    }
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public get title(): string {
    const name = this.form.get('name')?.value || '';
    return this.currentMode === 'create'
      ? `Create Carriage: ${name}`
      : `Update Carriage: ${name}`;
  }

  public closeDialog(): void {
    this.form.reset();
    this.store.dispatch(
      showCarriageForm({
        carriageCode: null,
        mode: this.currentMode,
      }),
    );
  }

  private updateCarriage(): void {
    const carriage = { ...this.form.value, code: this.currentCode };
    this.store.dispatch(updateCarriage({ carriage }));
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
    }
  }
}
