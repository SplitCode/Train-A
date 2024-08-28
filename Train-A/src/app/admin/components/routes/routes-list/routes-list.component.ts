import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesItem } from '../../../models/routes-item.interface';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllRoutes } from '../../../../redux/selectors/routes.selectors';
import { loadRoutes } from '../../../../redux/actions/routes.actions';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { RoutesItemComponent } from '../routes-item/routes-item.component';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { loadCarriages } from '../../../../redux/actions/carriage.actions';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import { loadStations } from '../../../../redux/actions/stations.actions';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [
    CustomButtonComponent,
    RoutesItemComponent,
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
      this.store
        .select(selectAllStations)
        .pipe(
          take(1),
          tap((stations) => {
            if (stations.length === 0) {
              this.store.dispatch(loadStations());
            }
          }),
        )
        .subscribe(),
    );

    this.subscriptions.add(
      this.store
        .select(selectAllCarriages)
        .pipe(
          take(1),
          tap((carriages) => {
            if (carriages.length === 0) {
              this.store.dispatch(loadCarriages());
            }
          }),
        )
        .subscribe(),
    );

    this.subscriptions.add(
      this.store
        .select(selectAllRoutes)
        .pipe(
          take(1),
          tap((routes) => {
            if (routes.length === 0) {
              this.store.dispatch(loadRoutes());
            }
          }),
        )
        .subscribe(),
    );

    // this.subscriptions.add(this.routes$.subscribe());

    this.carriageNames$ = combineLatest([
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

    this.cityNames$ = combineLatest([
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

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public createRoute(): void {
    console.log('create');
  }
}
