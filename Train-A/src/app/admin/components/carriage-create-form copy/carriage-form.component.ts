import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
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
    PRIME_NG_MODULES.InputTextModule,
  ],
})
export class CarriageFormComponent implements OnInit, OnDestroy {
  @Input() public config!: {
    currentCode: string;
    currentMode: 'create' | 'update';
    form: FormGroup;
    isVisible: boolean;
    foundedCarriage: CarriageItem;
  };

  @Output() public formSubmit = new EventEmitter<void>();

  // public currentCode: string = '';

  // private currentMode: 'create' | 'update' = 'update';

  // public form: FormGroup;

  // public isVisible: boolean = false;

  // public foundedCarriage?: CarriageItem;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.config.form = this.createCarriageForm();
  }

  public ngOnInit() {}

  public ngOnDestroy() {}

  public get title(): string {
    return this.config.currentMode === 'create'
      ? 'Create Carriage: '
      : 'Update Carriage: ';
  }

  private createCarriageForm(): FormGroup {
    return this.fb.group({
      name: [
        this.config.foundedCarriage?.name,
        [
          Validators.required,
          ,
          uniqueCarriageNameValidator(
            this.store,
            this.config.currentMode,
            this.config.foundedCarriage?.name || '',
          ),
        ],
      ],
      rows: [this.config.foundedCarriage?.rows, [Validators.required]],
      leftSeats: [
        this.config.foundedCarriage?.leftSeats,
        [Validators.required],
      ],
      rightSeats: [
        this.config.foundedCarriage?.rightSeats,
        [Validators.required],
      ],
    });
  }

  public onSubmit() {
    this.formSubmit.emit();
  }
}
