import { PRIME_NG_MODULES } from './../../../shared/modules/prime-ng-modules';
import { Component, Input, OnInit } from '@angular/core';
import { CarriageItem } from '../../models/carriage-item.interface';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { Store } from '@ngrx/store';
import { showCarriageForm } from '../../../redux/actions/carriage.actions';

@Component({
  selector: 'app-carriage-item',
  templateUrl: './carriage-item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.FieldsetModule,
    PRIME_NG_MODULES.DividerModule,
    PRIME_NG_MODULES.InputIconModule,
  ],
  styleUrls: ['./carriage-item.scss'],
})
export class CarriageItemComponent implements OnInit {
  @Input() public config!: CarriageItem;

  constructor(private store: Store) {}

  public ngOnInit() {}

  public createRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  public triggerUpdate(): void {
    console.log('triggerUpdate', this.config);
    this.store.dispatch(
      showCarriageForm({
        carriageCode: this.config.code,
        mode: 'update',
      }),
    );
  }
}
