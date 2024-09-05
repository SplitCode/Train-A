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
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrderRequest } from '../../../../home/models/order-responce.interface';
import {
  selectBook,
  selectOccupiedSeatsByRideId,
} from '../../../../redux/selectors/order.selectors';
import { createBook } from '../../../../redux/actions/ride.actions';

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

  private occupiedSeats$: Observable<number[]> = of([]);

  constructor(private route: ActivatedRoute) {
    super();
    this.book$ = this.store.select(selectBook);
    this.route.paramMap.subscribe((params) => {
      this.rideId = params.get('rideId');
      if (this.rideId != null) {
        this.occupiedSeats$ = this.store.select(
          selectOccupiedSeatsByRideId(+this.rideId),
        );
      }
    });
  }

  public ngOnInit() {
    if (this.carriageSeatConfig?.isWorking) {
      this.writeParamsFromRouter();
      this.listenBookStatus();
      this.listenOccupateSeat();
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
    if (this.carriageSeatConfig) {
      this.bookSeat();
    }
  }

  private bookSeat(): void {
    let book;
    if (this.carriageSeatConfig?.isWorking) {
      if (
        !this.config?.disabled &&
        this.carriageSeatConfig &&
        this.rideId &&
        this.fromStationId &&
        this.toStationId &&
        this.carriageSeatConfig.carriageNumber
      ) {
        book = {
          rideId: +this.rideId,
          seat: this.carriageSeatConfig.seatIdTrain,
          stationStart: +this.fromStationId,
          stationEnd: +this.toStationId,
          carriageNumber: this.carriageSeatConfig.carriageNumber,
          isShowBook: true,
        };
        this.store.dispatch(
          createBook({
            book: book,
          }),
        );
        console.log('book: ', book);
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

  private listenBookStatus(): void {
    const bookSubscription = this.book$.subscribe((book) => {
      if (this.carriageSeatConfig) {
        this.carriageSeatConfig.status = undefined;
      }

      if (
        book &&
        book.seat === this.carriageSeatConfig?.seatIdTrain &&
        book.carriageNumber === this.carriageSeatConfig?.carriageNumber
      ) {
        this.setBookedStatus();
      }
    });

    this.subscriptions.push(bookSubscription);
  }

  private listenOccupateSeat(): void {
    const seatIdTrain = this.carriageSeatConfig?.seatIdTrain;
    if (typeof seatIdTrain === 'number') {
      const occupateSeatSubscription = this.occupiedSeats$.subscribe(
        (seats: number[]) => {
          if (seats.includes(seatIdTrain)) {
            if (this.carriageSeatConfig)
              this.carriageSeatConfig.status = SeatStatus.Selected;
            if (this.config) this.config.disabled = true;
            console.log('I am occupite');
          }
        },
      );

      this.subscriptions.push(occupateSeatSubscription);
    }
  }
}
