import { Component, Input, OnInit } from '@angular/core';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  Observable,
  take,
  forkJoin,
  map,
  catchError,
  of,
  switchMap,
  Subscription,
} from 'rxjs';
import { RideResponse } from '../../../../order/models/ride-response.interface';
import { selectStationCityByID } from '../../../../redux/selectors/stations.selectors';
import { Store } from '@ngrx/store';
import { selectRideInfo } from '../../../../redux/selectors/ride.selectors';
import { CommonModule } from '@angular/common';
import { TimelineEvent } from '../../../models/time-line-event.interface';
import { StationCityByIdPipe } from '../../../pipes/station-sity-by-id.pipe';

@Component({
  selector: 'app-route-modal',
  templateUrl: './route-modal.component.html',
  styleUrls: ['./route-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    StationCityByIdPipe,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.TimelineModule,
  ],
})
export class RouteModalComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  public rideInfo$: Observable<RideResponse | null>;

  public timelineEvents$: Observable<TimelineEvent[]> = of([]);

  public events: TimelineEvent[] = [];

  @Input() config!: {
    isVisiblePath: boolean;
    fromStationId: string | null;
    toStationId: string | null;
    rideId: string | null;
  };

  constructor(private store: Store) {
    this.rideInfo$ = this.store.select(selectRideInfo);
  }

  public ngOnInit() {
    this.buildEvents();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private buildEvents(): void {
    if (this.config.rideId) {
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
    const fromStationId = Number(this.config.fromStationId);
    const toStationId = Number(this.config.toStationId);

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
            index === 0 || index === filteredPath.length - 1
              ? ''
              : prevSegment
                ? this.calculateTimeDifference(
                    prevSegment.time[1],
                    segment.time[0],
                  )
                : '';
          timelineEvents.push({
            status:
              index === 0
                ? 'First Station'
                : index === filteredPath.length - 1
                  ? 'Last Station'
                  : '',
            date: stationCities[index],
            arrivalTime: index === 0 ? '' : segment.time[0],
            departureTime:
              index === filteredPath.length - 1 ? '' : segment.time[1],
            timeDifference:
              index === 0 || index === filteredPath.length - 1
                ? ''
                : timeDifference,
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

  public isDialog(isShow: boolean) {
    this.config.isVisiblePath = isShow;
  }
}
