import { selectFilteredCarriages } from './../../../../redux/selectors/ride.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadRideInfo } from '../../../../redux/actions/ride.actions';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { RouteModalComponent } from '../../route-modal/route-modal.component';
import { CarriageTypeTabsComponent } from '../carriage-type-tabs/carriage-type-tabs.component';
import { BookButtonComponent } from '../book-button/book-button.component';
import { uprateTrain } from '../../../utilits/update-train';

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
    RouteModalComponent,
    CarriageTypeTabsComponent,
    BookButtonComponent,
  ],
  standalone: true,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  public isVisiblePath: boolean = false;

  public rideId: string | null = null;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

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

  private updateTrain() {
    const subscription = this.store
      .select(selectFilteredCarriages)
      .pipe()
      .subscribe((filteredCarriages) => {
        if (filteredCarriages) {
          const carriageNames = filteredCarriages.map(
            (carriage) => carriage.name,
          );
          uprateTrain(this.store, carriageNames);
        }
      });

    this.subscriptions.push(subscription);
  }

  public isDialog(isShow: boolean) {
    this.isVisiblePath = isShow;
  }

  public ngOnInit() {
    this.writeParamsFromRouter();
    this.loadRideInfo();
    this.updateTrain();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
