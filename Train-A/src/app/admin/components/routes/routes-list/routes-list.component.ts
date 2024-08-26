import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CommonModule } from '@angular/common';
import { RoutesService } from '../../../services/routes.service';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllRoutes } from '../../../../redux/selectors/routes.selectors';
import { loadRoutes } from '../../../../redux/actions/routes.actions';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [CustomButtonComponent, CommonModule],
  templateUrl: './routes-list.component.html',
})
export class RoutesListComponent implements OnInit, OnDestroy {
  public routes$: Observable<RoutesItem[]>;

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private service: RoutesService,
  ) {
    this.routes$ = this.store.select(selectAllRoutes);
  }

  public ngOnInit() {
    this.store.dispatch(loadRoutes());
    this.subscription.add(this.routes$.subscribe());
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public triggerCreate(): void {
    console.log('click');
    this.service.getRoutes().subscribe({
      next: (data) => {
        console.log('Routes:', data);
      },
      error: (error) => {
        console.error('Ошибка при получении маршрутов:', error);
      },
    });
  }
}
