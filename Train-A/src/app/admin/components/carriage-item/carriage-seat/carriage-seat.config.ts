export enum SeatStatus {
  Reserved = 'reserved',
  Available = 'available',
  Selected = 'selected',
}
export interface CarriageSeatConfig {
  seatId: number;
  status?: SeatStatus | undefined;
  styleClass?: string;
  isWorking: boolean;
  carriageNumber?: number | undefined;
}
