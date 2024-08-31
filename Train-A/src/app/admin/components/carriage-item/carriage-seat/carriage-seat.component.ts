import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components';
import { CarriageSeatConfig, SeatStatus } from './carriage-seat.config';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { createBook } from '../../../../redux/actions/order.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-carriage-seat',
  templateUrl: './carriage-seat.component.html',
  styleUrls: ['./carriage-seat.component.scss'],
  imports: [CustomButtonComponent, CommonModule],
  standalone: true,
})
export class CarriageSeatComponent extends CustomButtonComponent {
  @Input() public carriageSeatConfig?: CarriageSeatConfig;

  @Output() public override clickEmitter = new EventEmitter<void>();

  public rideId: string | null = null;

  public fromStationId: string | null = null;

  public toStationId: string | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    super();
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
  // Красить кнопку из book
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

  ngOnInit() {
    if (this.carriageSeatConfig?.isWorking) {
      this.writeParamsFromRouter();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
