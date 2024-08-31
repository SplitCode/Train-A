import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Store } from '@ngrx/store';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import {
  routeModal,
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
  ],
  templateUrl: './routes-item.component.html',
})
export class RoutesItemComponent {
  @Input() public config!: RoutesItem;

  @Input() public carriageNames!: string[];

  @Input() public cityNames!: string[];

  @Output() public delete = new EventEmitter<number>();

  visible: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  public showUpdateForm(): void {
    this.store.dispatch(
      showRouteForm({
        routeId: this.config.id,
        mode: 'update',
      }),
    );
  }

  public assignRide(): void {
    this.router.navigate(['/admin/routes', this.config.id]);
  }

  public setModalInfo(visible: boolean, routeId: number): void {
    this.store.dispatch(
      routeModal({
        modalInfo: {
          visibleModal: visible,
          routeInfo: {
            id: routeId,
          },
        },
      }),
    );
  }
}

// this.store.dispatch(showRouteForm({ routeId: this.config.id, mode: 'update' }));
