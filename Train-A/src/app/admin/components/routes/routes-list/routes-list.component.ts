import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesItem } from '../../../models/routes-item.interface';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllRoutes } from '../../../../redux/selectors/routes.selectors';
import { showRouteForm } from '../../../../redux/actions/routes.actions';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { RoutesItemComponent } from '../routes-item/routes-item.component';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import { RoutesFormComponent } from '../routes-form/routes-form.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ScrollingModule,
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
      this.routes$.subscribe(() => {
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
