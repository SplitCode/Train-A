import { Component, effect, OnInit, signal } from '@angular/core';
import { CarriageItem } from '../../../../admin/models/carriage-item.interface';
import {
  combineLatest,
  filter,
  mergeMap,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCarriageTypes } from '../../../../redux/selectors/ride.selectors';
import { updateFilteredCarriages } from '../../../../redux/actions/ride.actions';
import { selectCarriageByName } from '../../../../redux/selectors/carriage.selectors';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import { UniqueInArrPipe } from '../../../../shared/pipes/unique-in-arr.pipe';
import { CarriageItemComponent } from '../../../../admin/components/carriage-item/carriage-item.component';

@Component({
  selector: 'app-carriage-type-tabs',
  templateUrl: './carriage-type-tabs.component.html',
  styleUrls: ['./carriage-type-tabs.component.scss'],
  standalone: true,
  imports: [
    PRIME_NG_MODULES.TabViewModule,
    CommonModule,
    UniqueInArrPipe,
    CarriageItemComponent,
  ],
})
export class CarriageTypeTabsComponent implements OnInit {
  private carriagesConfigCache: { [key: string]: CarriageItem[] } = {};

  public carriagesByTypes = signal<CarriageItem[]>([]);

  public carriageTypes$: Observable<string[] | undefined>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store) {
    this.carriageTypes$ = this.store.select(selectCarriageTypes);
    this.listenSignals();
  }

  private listenSignals(): void {
    effect(() => {
      console.log('Current carriagesByTypes:', this.carriagesByTypes());
    });
  }

  public ngOnInit() {
    this.processCarriagesByTypes();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private updateCarrNumbersInTrain(carriagesByTypeItems: CarriageItem[]): void {
    const carriagesWithNumbers = carriagesByTypeItems.map(
      (carriage, index) => ({
        ...carriage,
        carriageNumber: index + 1,
      }),
    );

    this.carriagesByTypes.update(() => carriagesWithNumbers);
    this.store.dispatch(updateFilteredCarriages(carriagesWithNumbers));
  }

  private processCarriagesByTypes(): void {
    const carriageTypesSubscription = this.carriageTypes$
      .pipe(
        mergeMap((carriageTypes) => {
          if (!carriageTypes) return of([]);
          return combineLatest(
            carriageTypes.map((carriageType) =>
              this.store
                .select(selectCarriageByName(carriageType))
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
          this.updateCarrNumbersInTrain(carriagesByTypeItems);
        }),
      )
      .subscribe();
    this.subscriptions.push(carriageTypesSubscription);
  }

  private getCarriageByType(carriageType: string): CarriageItem | undefined {
    console.log(carriageType);
    return this.carriagesByTypes().find(
      (carriage) => carriage.name === carriageType,
    );
  }

  public getCarriagesConfig(carriageType: string): CarriageItem[] {
    if (!this.carriagesConfigCache[carriageType]) {
      this.carriagesConfigCache[carriageType] = this.carriagesByTypes()
        .filter((carriage) => carriage.name === carriageType)
        .map((carriage) => ({
          ...carriage,
          mode: carriage.mode || 'interActive',
          isWorking: true,
        }));
    }
    return this.carriagesConfigCache[carriageType];
  }
}
