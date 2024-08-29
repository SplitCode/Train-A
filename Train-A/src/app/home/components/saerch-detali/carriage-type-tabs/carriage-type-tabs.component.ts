import { Component, OnInit, signal } from '@angular/core';
import { CarriageItem } from '../../../../admin/models/carriage-item.interface';
import {
  combineLatest,
  filter,
  mergeMap,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCarriageTypes } from '../../../../redux/selectors/ride.selectors';
import { updateFilteredCarriages } from '../../../../redux/actions/ride.actions';
import { selectCarriageByCode } from '../../../../redux/selectors/carriage.selectors';

@Component({
  selector: 'app-carriage-type-tabs',
  templateUrl: './carriage-type-tabs.component.html',
  styleUrls: ['./carriage-type-tabs.component.scss'],
  standalone: true,
  imports: [],
})
export class CarriageTypeTabsComponent implements OnInit {
  public carriagesByTypes = signal<CarriageItem[]>([]);

  private carriageTypes$: Observable<string[] | undefined>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store) {
    this.carriageTypes$ = this.store.select(selectCarriageTypes);
  }

  public ngOnInit() {
    this.processCarriagesByTypes();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private updateCarriagesByTypes(carriagesByTypeItems: CarriageItem[]): void {
    this.carriagesByTypes.update(() => carriagesByTypeItems);
    console.log('Updated carriagesByTypes:', this.carriagesByTypes());
    this.store.dispatch(
      updateFilteredCarriages({ filteredCarriages: carriagesByTypeItems }),
    );
  }

  private processCarriagesByTypes(): void {
    const carriageTypesSubscription = this.carriageTypes$
      .pipe(
        mergeMap((carriageTypes) => {
          if (!carriageTypes) return [];
          return combineLatest(
            carriageTypes.map((carriageType) =>
              this.store
                .select(selectCarriageByCode(carriageType))
                .pipe(
                  filter(
                    (carriageByTypeItem): carriageByTypeItem is CarriageItem =>
                      !!carriageByTypeItem,
                  ),
                ),
            ),
          );
        }),
        tap((carriagesByTypeItems) => {
          console.log('Filtered carriages:', carriagesByTypeItems);
          this.updateCarriagesByTypes(carriagesByTypeItems);
        }),
      )
      .subscribe();
    this.subscriptions.push(carriageTypesSubscription);
  }
}
