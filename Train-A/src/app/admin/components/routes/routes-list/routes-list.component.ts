import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesItem } from '../../../models/routes-item.interface';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllRoutes } from '../../../../redux/selectors/routes.selectors';
import {
  loadRoutes,
  showRouteForm,
} from '../../../../redux/actions/routes.actions';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { RoutesItemComponent } from '../routes-item/routes-item.component';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { loadCarriages } from '../../../../redux/actions/carriage.actions';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import { loadStations } from '../../../../redux/actions/stations.actions';
import { RoutesFormComponent } from '../routes-form/routes-form.component';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [
    CustomButtonComponent,
    RoutesItemComponent,
    RoutesFormComponent,
    CommonModule,
    PRIME_NG_MODULES.PanelModule,
    PRIME_NG_MODULES.DividerModule,
  ],
  templateUrl: './routes-list.component.html',
})
export class RoutesListComponent implements OnInit, OnDestroy {
  public routes$: Observable<RoutesItem[]>;

  public carriageNames$!: Observable<string[][]>;

  public cityNames$!: Observable<string[][]>;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.routes$ = this.store.select(selectAllRoutes);
  }

  ngOnInit() {
    this.subscriptions.add(
      forkJoin({
        routes: this.routes$.pipe(take(1)),
        stations: this.store.select(selectAllStations).pipe(take(1)),
        carriages: this.store.select(selectAllCarriages).pipe(take(1)),
      })
        .pipe(
          tap(({ stations, carriages, routes }) => {
            if (routes.length === 0) this.store.dispatch(loadRoutes());
            if (stations.length === 0) this.store.dispatch(loadStations());
            if (carriages.length === 0) this.store.dispatch(loadCarriages());
          }),
          switchMap(() => this.routes$),
        )
        .subscribe(() => {
          this.cityNames$ = this.getCityNames();
          this.carriageNames$ = this.getCarriageNames();
        }),
    );
  }

  private getCityNames(): Observable<string[][]> {
    return combineLatest([
      this.store.select(selectAllStations),
      this.routes$,
    ]).pipe(
      map(([allStations, routes]) =>
        routes.map((route) =>
          route.path.map((stationId) => {
            const station = allStations.find((s) => s.id === stationId);
            return station ? station.city : 'Unknown city';
          }),
        ),
      ),
    );
  }

  private getCarriageNames(): Observable<string[][]> {
    return combineLatest([
      this.store.select(selectAllCarriages),
      this.routes$,
    ]).pipe(
      map(([allCarriages, routes]) =>
        routes.map((route) =>
          route.carriages.map((code) => {
            const carriage = allCarriages.find((c) => c.code === code);
            return carriage ? carriage.name : 'Unknown type';
          }),
        ),
      ),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public createRoute(): void {
    this.store.dispatch(
      showRouteForm({
        mode: 'create',
      }),
    );
  }
}

// this.store.dispatch(createRoute({ route: { path: [], carriages: [] } }));
