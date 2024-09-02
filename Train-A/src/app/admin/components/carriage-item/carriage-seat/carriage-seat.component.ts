import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components';
import { CarriageSeatConfig, SeatStatus } from './carriage-seat.config';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { createBook } from '../../../../redux/actions/order.actions';
import { Store } from '@ngrx/store';
import { OrderRequest } from '../../../../home/models/order-responce.interface';
import { selectBook } from '../../../../redux/selectors/order.selectors';

@Component({
  selector: 'app-carriage-seat',
  templateUrl: './carriage-seat.component.html',
  styleUrls: ['./carriage-seat.component.scss'],
  imports: [CustomButtonComponent, CommonModule],
  standalone: true,
})
export class CarriageSeatComponent
  extends CustomButtonComponent
  implements OnInit
{
  private store = inject(Store);

  @Input() public carriageSeatConfig?: CarriageSeatConfig;

  @Output() public override clickEmitter = new EventEmitter<void>();

  public rideId: string | null = null;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  private book$: Observable<OrderRequest | null>;

  constructor(private route: ActivatedRoute) {
    super();
    this.book$ = this.store.select(selectBook);
  }

  public ngOnInit() {
    if (this.carriageSeatConfig?.isWorking) {
      this.writeParamsFromRouter();
      this.listenBookStatus();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private writeParamsFromRouter(): void {
    this.rideId = this.route.snapshot.paramMap.get('rideId');
    const queryParamsSubscription = this.route.queryParamMap.subscribe(
      (params) => {
        this.fromStationId = params.get('from');
        this.toStationId = params.get('to');
      },
    );
    this.subscriptions.push(queryParamsSubscription);
  }

  override handleEvent() {
    this.bookSeat();
  }

  private bookSeat(): void {
    if (this.carriageSeatConfig?.isWorking) {
      if (
        !this.config?.disabled &&
        this.carriageSeatConfig &&
        this.rideId &&
        this.fromStationId &&
        this.toStationId &&
        this.carriageSeatConfig.carriageNumber
      ) {
        this.store.dispatch(
          createBook({
            book: {
              rideId: +this.rideId,
              seat: this.carriageSeatConfig.seatId,
              fromStationId: +this.fromStationId,
              toStationId: +this.toStationId,
              carriageNumber: this.carriageSeatConfig.carriageNumber,
              isShowBook: true,
            },
          }),
        );
        console.log('fromStationId', this.fromStationId);
      }
    }
  }

  public getSeatClass(): string {
    switch (this.carriageSeatConfig?.status) {
      case SeatStatus.Reserved:
        return 'seat reserved';
      case SeatStatus.Available:
        return 'seat available';
      case SeatStatus.Selected:
        return 'seat occupied';
      default:
        return 'seat';
    }
  }

  private setBookedStatus(): void {
    if (this.carriageSeatConfig) {
      this.carriageSeatConfig.status = SeatStatus.Reserved;
    }
  }

  private listenBookStatus() {
    const bookSubscription = this.book$.subscribe((book) => {
      if (this.carriageSeatConfig) {
        this.carriageSeatConfig.status = undefined;
      }

      if (
        book &&
        book.seat === this.carriageSeatConfig?.seatId &&
        book.carriageNumber === this.carriageSeatConfig?.carriageNumber
      ) {
        this.setBookedStatus();
      }
    });

    this.subscriptions.push(bookSubscription);
  }
}
