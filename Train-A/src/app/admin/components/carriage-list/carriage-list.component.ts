import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CarriageItem } from '../../models/carriage-item.interface';
import { loadCarriages } from '../../../redux/actions/carriage.actions';
import { selectAllCarriages } from '../../../redux/selectors/carriage.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-carriage-list',
  templateUrl: './carriage-list.component.html',
  standalone: true,
})
export class CarriageListComponent implements OnInit, OnDestroy {
  carriages$: Observable<CarriageItem[]>;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.carriages$ = this.store.select(selectAllCarriages);
  }

  ngOnInit() {
    this.store.dispatch(loadCarriages());

    this.subscriptions.add(
      this.carriages$.subscribe((carriages) => {
        console.log('Carriages in component:', carriages);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
