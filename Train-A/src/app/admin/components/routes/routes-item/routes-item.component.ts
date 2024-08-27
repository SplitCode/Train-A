import { Component, Input } from '@angular/core';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Store } from '@ngrx/store';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { deleteRoute } from '../../../../redux/actions/routes.actions';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-routes-item',
  standalone: true,
  imports: [CustomButtonComponent, FieldsetModule, CommonModule, DialogModule],
  templateUrl: './routes-item.component.html',
})
export class RoutesItemComponent {
  @Input() public config!: RoutesItem;

  @Input() public carriageNames!: string[];

  visible: boolean = false;

  constructor(private store: Store) {}

  public updateRoute(): void {
    // this.store.dispatch(
    //   showRouteForm({
    //     routeCode: this.config.code,
    //     mode: 'update',
    //   }),
    // );
    console.log('update');
  }

  public deleteRoute(routeId: number): void {
    this.store.dispatch(deleteRoute({ routeId: routeId }));
    console.log('delete');
  }

  public assignRide(): void {
    console.log('ride');
  }
}
