import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomButtonComponent } from '../../../../shared/components';
import { Observable, Subscription } from 'rxjs';
import { selectBook } from '../../../../redux/selectors/order.selectors';
import { OrderRequest } from '../../../models/order-responce.interface';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { BookButtonConfig } from './book-button.config';
import { CommonModule } from '@angular/common';
import { createOrder } from '../../../../redux/actions/ride.actions';

@Component({
  selector: 'app-book-button',
  templateUrl: './book-button.component.html',
  styleUrls: ['./book-button.component.scss'],
  imports: [CommonModule, CustomButtonComponent, PRIME_NG_MODULES.CardModule],
  standalone: true,
})
export class BookButtonComponent
  extends CustomButtonComponent
  implements OnInit
{
  @Input() public bookButtonConfig?: BookButtonConfig;

  @Output() public override clickEmitter = new EventEmitter<void>();

  public rideId: string | null = null;

  private store = inject(Store);

  private subscriptions: Subscription[] = [];

  public book$: Observable<OrderRequest | null>;

  constructor() {
    super();
    this.book$ = this.store.select(selectBook);
  }

  public ngOnInit() {
    this.listenBookStatus();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private writeBookAndShow(book: OrderRequest): void {
    const { carriageNumber, seat, isShowBook, price } = book;
    if (this.bookButtonConfig) {
      this.bookButtonConfig.isShow = isShowBook;
      this.bookButtonConfig.carriageNumber = carriageNumber;
      this.bookButtonConfig.seatId = seat;
      this.bookButtonConfig.price = price;
    }
  }

  private listenBookStatus() {
    const bookSubscription = this.book$.subscribe((book) => {
      if (book) {
        this.writeBookAndShow(book);
      }
    });
    this.subscriptions.push(bookSubscription);
  }

  override handleEvent() {
    const order = {
      rideId: +(this.bookButtonConfig?.rideId ?? 0),
      seat: +(this.bookButtonConfig?.seatId ?? 0),
      stationStart: +(this.bookButtonConfig?.stationStart ?? 0),
      stationEnd: +(this.bookButtonConfig?.stationEnd ?? 0),
    };
    this.store.dispatch(
      createOrder({
        orderRequest: order,
      }),
    );
    console.log('Order: ', order);
  }

  public get carriageNumber() {
    return this.bookButtonConfig?.carriageNumber
      ? `Car ${this.bookButtonConfig?.carriageNumber}`
      : 'Car';
  }
}
