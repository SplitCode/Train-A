export enum SeatStatus {
  Reserved = 'reserved',
  Available = 'available',
  Selected = 'selected',
}
export interface CarriageSeatConfig {
  seatId: number;
  status?: SeatStatus;
  styleClass?: string;
  isWorking: boolean;
  carriageType?: string;
}
