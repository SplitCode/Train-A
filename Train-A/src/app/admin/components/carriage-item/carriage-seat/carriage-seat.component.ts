import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components';
import { CarriageSeatConfig, SeatStatus } from './carriage-seat.config';
import { CommonModule } from '@angular/common';

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

  override handleEvent(event: Event) {
    super.handleEvent(event);
    if (!this.config?.disabled && this.carriageSeatConfig) {
      console.log('CarriageSeatComponent', this.carriageSeatConfig.seatId);
    }
  }

  getSeatClass(): string {
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
}
