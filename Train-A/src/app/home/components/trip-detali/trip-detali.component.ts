import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  mergeMap,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';
import {
  loadRideInfo,
  updateFilteredCarriages,
} from '../../../redux/actions/ride.actions';
import { selectCarriageTypes } from '../../../redux/selectors/ride.selectors';

import { selectCarriageByCode } from '../../../redux/selectors/carriage.selectors';
import { CarriageItem } from '../../../admin/models/carriage-item.interface';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { StationCityByIdPipe } from '../../pipes/station-sity-by-id.pipe';
import { RouteModalComponent } from '../route-modal/route-modal.component';
interface TimelineEvent {
  status: string;
  date: string;
  arrivalTime: string;
  departureTime: string;
  timeDifference: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-trip-detali',
  templateUrl: './trip-detali.component.html',
  styleUrls: ['./trip-detali.component.scss'],
  imports: [
    CommonModule,
    PRIME_NG_MODULES.TimelineModule,
    PRIME_NG_MODULES.PanelModule,
    CustomButtonComponent,
    RouterModule,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.TagModule,
    StationCityByIdPipe,
    RouteModalComponent,
  ],
  standalone: true,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  public isVisiblePath: boolean = false;

  public carriagesByTypes = signal<CarriageItem[]>([]);

  private carriageTypes$: Observable<string[] | undefined>;

  public timelineEvents$: Observable<TimelineEvent[]> = of([]);

  public rideId: string | null = null;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  events: TimelineEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
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

  public isDialog(isShow: boolean) {
    this.isVisiblePath = isShow;
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
