import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CarriageItem } from '../../models/carriage-item.interface';
import {
  loadCarriages,
  showCarriageForm,
} from '../../../redux/actions/carriage.actions';
import { selectAllCarriages } from '../../../redux/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { CarriageItemComponent } from '../carriage-item/carriage-item.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { CarriageFormComponent } from '../carriage-create-form/carriage-form.component';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-carriage-list',
  templateUrl: './carriage-list.component.html',
  standalone: true,
  imports: [
    CarriageItemComponent,
    CommonModule,
    CarriageFormComponent,
    CustomButtonComponent,
  ],
})
export class CarriageListComponent implements OnInit, OnDestroy {
  public carriages$: Observable<CarriageItem[]>;

  private subscriptions: Subscription = new Subscription();

  private createCode: ShortUniqueId = new ShortUniqueId({ length: 7 });

  constructor(private store: Store) {
    this.carriages$ = this.store.select(selectAllCarriages);
  }

  public ngOnInit() {
    this.store.dispatch(loadCarriages());
    this.subscriptions.add(this.carriages$.subscribe());
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public triggerCreate(): void {
    const code = this.createCode.rnd();
    console.log('triggerCreate', code);
    this.store.dispatch(
      showCarriageForm({
        carriageCode: `${code}`,
        mode: 'create',
      }),
    );
  }
}
