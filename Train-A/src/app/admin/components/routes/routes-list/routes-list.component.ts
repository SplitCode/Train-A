import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesItem } from '../../../models/routes-item.interface';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllRoutes,
  selectModalInfo,
  selectRouteFormMode,
  selectRouteFormVisibility,
} from '../../../../redux/selectors/routes.selectors';
import {
  deleteRoute,
  routeModal,
  showRouteForm,
} from '../../../../redux/actions/routes.actions';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { RoutesItemComponent } from '../routes-item/routes-item.component';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import { CreateRouteFormComponent } from '../create-route-form/create-route-form.component';
import { UpdateRouteFormComponent } from '../update-route-form/update-route-form.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalInfo } from '../../../../redux/states/routes.state';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [
    CustomButtonComponent,
    RoutesItemComponent,
    CreateRouteFormComponent,
    UpdateRouteFormComponent,
    CommonModule,
    PRIME_NG_MODULES.PanelModule,
    PRIME_NG_MODULES.DividerModule,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.CardModule,
    ScrollingModule,
  ],
  templateUrl: './routes-list.component.html',
})
export class RoutesListComponent implements OnInit, OnDestroy {
  public routes$: Observable<RoutesItem[]>;

  public carriageNames$!: Observable<string[][]>;

  public cityNames$!: Observable<string[][]>;

  public modalInfo$!: Observable<ModalInfo>;

  public localModalInfo!: ModalInfo;

  public formVisible$: Observable<boolean>;

  public currentMode$: Observable<'create' | 'update'>;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.routes$ = this.store.select(selectAllRoutes);
    this.modalInfo$ = this.store.select(selectModalInfo);
    this.formVisible$ = this.store.select(selectRouteFormVisibility);
    this.currentMode$ = this.store.select(selectRouteFormMode);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.routes$.subscribe(() => {
        this.cityNames$ = this.getCityNames();
        this.carriageNames$ = this.getCarriageNames();
      }),
    );

    this.modalInfo$.forEach((item) => {
      this.localModalInfo = { ...item };
    });
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
            return station ? station.city : stationId.toString();
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
            return carriage ? carriage.name : code;
          }),
        ),
      ),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public showCreateForm(): void {
    this.store.dispatch(
      showRouteForm({
        routeId: null,
        mode: 'create',
      }),
    );
  }

  public deleteRoute(): void {
    this.store.dispatch(
      deleteRoute({ routeId: this.localModalInfo.routeInfo.id }),
    );
  }

  public closeModal() {
    this.store.dispatch(
      routeModal({
        modalInfo: {
          visibleModal: false,
          routeInfo: {
            id: 0,
          },
        },
      }),
    );
  }
}
