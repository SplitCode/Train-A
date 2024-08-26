import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllRoutes } from '../../../../redux/selectors/routes.selectors';
import { loadRoutes } from '../../../../redux/actions/routes.actions';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { RoutesItemComponent } from '../routes-item/routes-item.component';

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

  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {
    this.routes$ = this.store.select(selectAllRoutes);
  }

  // public ngOnInit() {
  //   this.store.dispatch(loadRoutes());
  //   this.subscription.add(this.routes$.subscribe());
  // }

  public ngOnInit() {
    this.store.dispatch(loadRoutes());
    this.subscription.add(
      this.routes$.subscribe((routes) => {
        console.log('Routes from store:', routes);
      }),
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public createRoute(): void {
    console.log('click');
    // this.service.getRoutes().subscribe({
    //   next: (data) => {
    //     console.log('Routes:', data);
    //   },
    //   error: (error) => {
    //     console.error('Ошибка при получении маршрутов:', error);
    //   },
    // });
  }
}
