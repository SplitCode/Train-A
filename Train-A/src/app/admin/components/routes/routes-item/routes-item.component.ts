import { Component, Input } from '@angular/core';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Store } from '@ngrx/store';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import {
  deleteRoute,
  showRouteForm,
} from '../../../../redux/actions/routes.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes-item',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.FieldsetModule,
    PRIME_NG_MODULES.DialogModule,
  ],
  templateUrl: './routes-item.component.html',
})
export class RoutesItemComponent {
  @Input() public config!: RoutesItem;

  @Input() public carriageNames!: string[];

  @Input() public cityNames!: string[];

  visible: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  public updateRoute(): void {
    this.store.dispatch(
      showRouteForm({
        mode: 'update',
      }),
    );
    // this.store.dispatch(showRouteForm({ mode: 'update', route }));
  }

  public deleteRoute(routeId: number): void {
    this.store.dispatch(deleteRoute({ routeId: routeId }));
  }

  public assignRide(): void {
    this.router.navigate(['/admin/routes', this.config.id]);
  }
}

// this.store.dispatch(showRouteForm({ routeId: this.config.id, mode: 'update' }));
