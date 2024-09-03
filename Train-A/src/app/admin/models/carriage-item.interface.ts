export interface CarriageItem {
  code: string;
  leftSeats: number;
  name: string;
  rightSeats: number;
  rows: number;
  mode?: string;
  isWorking: boolean;
  carriageNumber?: number;
  totalRidePrice?: number;
  totalSeats?: number;
  previousSeats?: number;
}
