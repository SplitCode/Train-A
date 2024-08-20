import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CarriageItem } from '../../models/carriage-item.interface';
import { loadCarriages } from '../../../redux/actions/carriage.actions';
import { selectAllCarriages } from '../../../redux/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { CarriageItemComponent } from '../carriage-item/carriage-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carriage-list',
  templateUrl: './carriage-list.component.html',
  standalone: true,
  imports: [CarriageItemComponent, CommonModule],
})
export class CarriageListComponent implements OnInit, OnDestroy {
  public carriages$: Observable<CarriageItem[]>;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.carriages$ = this.store.select(selectAllCarriages);
  }

  public ngOnInit() {
    this.store.dispatch(loadCarriages());
    this.subscriptions.add(this.carriages$.subscribe());
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
