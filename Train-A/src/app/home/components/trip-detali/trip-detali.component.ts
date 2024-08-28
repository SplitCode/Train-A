import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  mergeMap,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import {
  loadRideInfo,
  updateFilteredCarriages,
} from '../../../redux/actions/ride.actions';
import {
  selectCarriageTypes,
  selectRideInfo,
} from '../../../redux/selectors/ride.selectors';
import { RideResponse } from '../../../order/models/ride-response.interface';
import { selectCarriageByCode } from '../../../redux/selectors/carriage.selectors';
import { CarriageItem } from '../../../admin/models/carriage-item.interface';

@Component({
  selector: 'app-trip-detali',
  templateUrl: './trip-detali.component.html',
  styleUrls: ['./trip-detali.component.scss'],
  standalone: true,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  public carriagesByTypes = signal<CarriageItem[]>([]);

  private carriageTypes$: Observable<string[] | undefined>;

  public rideId: string | null = null;

  public rideInfo$: Observable<RideResponse | null>;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.rideInfo$ = this.store.select(selectRideInfo);
    this.carriageTypes$ = this.store.select(selectCarriageTypes);
  }

  private writeParamsFromRouter(): void {
    this.rideId = this.route.snapshot.paramMap.get('rideId');
    const queryParamsSubscription = this.route.queryParamMap.subscribe(
      (params) => {
        this.fromStationId = params.get('from');
        this.toStationId = params.get('to');
      },
    );
    this.subscriptions.push(queryParamsSubscription);
  }

  private loadRideInfo(): void {
    if (this.rideId) {
      this.store.dispatch(loadRideInfo({ rideId: this.rideId }));
    }
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

  public ngOnInit() {
    this.writeParamsFromRouter();
    this.loadRideInfo();
    this.processCarriagesByTypes();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
