import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
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
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';
import { selectStationCityByID } from '../../../redux/selectors/stations.selectors';
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
  imports: [CommonModule, PRIME_NG_MODULES.TimelineModule],
  standalone: true,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  public carriagesByTypes = signal<CarriageItem[]>([]);

  private carriageTypes$: Observable<string[] | undefined>;

  timelineEvents$: Observable<TimelineEvent[]> = of([]);

  public rideId: string | null = null;

  public rideInfo$: Observable<RideResponse | null>;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  events: TimelineEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.rideInfo$ = this.store.select(selectRideInfo);
    this.carriageTypes$ = this.store.select(selectCarriageTypes);
  }

  private buildEvents(): void {
    if (this.rideId) {
      this.rideInfo$ = this.store.select(selectRideInfo);
      this.timelineEvents$ = this.rideInfo$.pipe(
        switchMap((rideInfo) =>
          rideInfo ? this.transformToTimelineEvents(rideInfo) : of([]),
        ),
        catchError(() => of([])),
      );

      const subscription = this.timelineEvents$.subscribe((events) => {
        this.events = events;
      });
      this.subscriptions.push(subscription);
    }
  }

  private transformToTimelineEvents(
    rideInfo: RideResponse,
  ): Observable<TimelineEvent[]> {
    console.log(rideInfo);
    const fromStationId = Number(this.fromStationId);
    const toStationId = Number(this.toStationId);

    const startIndex = rideInfo.path.indexOf(fromStationId);
    const endIndex = rideInfo.path.indexOf(toStationId);

    const filteredPath = rideInfo.path.slice(startIndex, endIndex + 1);
    const stationObservables = filteredPath.map((stationId) =>
      this.store.select(selectStationCityByID(stationId)).pipe(take(1)),
    );

    return forkJoin(stationObservables).pipe(
      map((stationCities) => {
        const timelineEvents: TimelineEvent[] = [];

        filteredPath.forEach((stationId, index) => {
          const segment = rideInfo.schedule.segments[startIndex + index];
          const prevSegment =
            rideInfo.schedule.segments[startIndex + index - 1];
          const timeDifference =
            index === 0
              ? 'First Station'
              : prevSegment
                ? this.calculateTimeDifference(
                    prevSegment.time[1],
                    segment.time[0],
                  )
                : '';

          console.log(
            `Station ID: ${stationId}, Arrival Time: ${segment.time[0]}, Departure Time: ${segment.time[1]}, Time Difference: ${timeDifference}`,
          ); // Логирование

          timelineEvents.push({
            status:
              index === 0
                ? 'First Station'
                : index === filteredPath.length - 1
                  ? 'Last Station'
                  : '',
            date: stationCities[index],
            arrivalTime: index === 0 ? '' : segment.time[0],
            departureTime: segment.time[1],
            timeDifference: timeDifference,
            color:
              index === 0
                ? '#4CAF50'
                : index === filteredPath.length - 1
                  ? '#F44336'
                  : '#FFC107',
            icon:
              index === 0
                ? 'pi pi-map-marker'
                : index === filteredPath.length - 1
                  ? 'pi pi-flag'
                  : 'pi pi-road',
          });
        });

        return timelineEvents;
      }),
    );
  }

  private calculateTimeDifference(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
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
    this.buildEvents();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
