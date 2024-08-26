import { Component, Input } from '@angular/core';
import { RoutesItem } from '../../../models/routes-item.interface';
import { Store } from '@ngrx/store';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-item',
  standalone: true,
  imports: [CustomButtonComponent, FieldsetModule, CommonModule],
  templateUrl: './routes-item.component.html',
  styleUrl: './routes-item.component.scss',
})
export class RoutesItemComponent {
  @Input() public config!: RoutesItem;

  @Input() public carriageNames!: string[];

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

  public deleteRoute(): void {
    // this.store.dispatch(deleteRoute({ routeId: this.config.id }));
    console.log('delete');
  }

  public assignRide(): void {
    console.log('ride');
  }
}
