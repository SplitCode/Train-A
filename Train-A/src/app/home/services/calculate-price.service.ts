import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectRideInfo } from '../../redux/selectors/ride.selectors';
import { RideResponse } from '../models/ride-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculatePriceService {
  private orders$: Observable<RideResponse | null>;

  private orders!: RideResponse;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectRideInfo);

    this.orders$.subscribe((item) => {
      if (!item) return;
      this.orders = item;
    });
  }

  private getIndexOf(id: number): number {
    return this.orders.path.indexOf(id);
  }

  public calculatePrice(
    stationStart: number,
    stationEnd: number,
    carriageType: string,
  ): number {
    let resultPrice: number = 0;
    const stationStartINDEXOF = this.getIndexOf(stationStart);
    const stationEndINDEXOF = this.getIndexOf(stationEnd);

    this.orders.schedule.segments.forEach((item, index) => {
      if (stationStartINDEXOF <= index && index <= stationEndINDEXOF) {
        resultPrice += item.price[carriageType];
      }
    });

    return resultPrice;
  }
}
