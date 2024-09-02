import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
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
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-carriage-seat',
  templateUrl: './carriage-seat.component.html',
  styleUrls: ['./carriage-seat.component.scss'],
  imports: [CustomButtonComponent, CommonModule],
  standalone: true,
})
export class CarriageSeatComponent extends CustomButtonComponent {
  private store = inject(Store);

  bookSignal = toSignal(this.store.select(selectBook), {
    initialValue: null,
  });

  @Input() public carriageSeatConfig?: CarriageSeatConfig;

  @Output() public override clickEmitter = new EventEmitter<void>();

  public rideId: string | null = null;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  book$: Observable<OrderRequest | null>;

  constructor(private route: ActivatedRoute) {
    super();
    this.book$ = this.store.select(selectBook);
    this.listenBook();
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

  private bookSeat(): void {
    if (this.carriageSeatConfig?.isWorking) {
      if (
        !this.config?.disabled &&
        this.carriageSeatConfig &&
        this.rideId &&
        this.fromStationId &&
        this.toStationId
      ) {
        this.store.dispatch(
          createBook({
            book: {
              rideId: +this.rideId,
              seat: this.carriageSeatConfig.seatId,
              fromStationId: +this.fromStationId,
              toStationId: +this.toStationId,
              carriageType: this.carriageSeatConfig.carriageType,
            },
          }),
        );
        console.log('fromStationId', this.fromStationId);
      }
    }
  }

  override handleEvent() {
    this.bookSeat();
  }

  // Подумать о подсчете свободных мест через экшены
  // Подписаться на экшены
  // Красить кнопку из book только в одном вагоне
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

  private setBookedStatus(book: OrderRequest): void {
    if (
      this.carriageSeatConfig &&
      book.seat === this.carriageSeatConfig.seatId
    ) {
      this.carriageSeatConfig.status = SeatStatus.Selected;
      console.log('setBookedStatus', this.carriageSeatConfig.status);
    } else {
      console.log(
        'carriageSeatConfig is undefined, null, или seatId не совпадает',
      );
    }
  }

  private listenBook() {
    effect(() => {
      const book = this.bookSignal();
      if (book && book.seat === this.carriageSeatConfig?.seatId) {
        console.log(
          'Book signal received for seat:',
          this.carriageSeatConfig?.seatId,
        );
        this.setBookedStatus(book);
        console.log(`Бронь получена: ${this.carriageSeatConfig?.seatId}`, book);
        console.log(this.getSeatClass());
      } else if (!book) {
        console.log('Бронь не найдена');
      }
    });
  }

  ngOnInit() {
    if (this.carriageSeatConfig?.isWorking) {
      this.writeParamsFromRouter();
    }
    if (
      this.fromStationId &&
      this.toStationId &&
      this.carriageSeatConfig?.carriageType
    ) {
      console.log('current type', this.carriageSeatConfig?.carriageType);
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
