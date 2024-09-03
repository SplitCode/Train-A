export interface BookButtonConfig {
  isShow?: boolean;
  seatId?: number;
  carriageNumber?: number | undefined;
  price?: number;
  rideId: string | null;
  stationStart: string | null;
  stationEnd: string | null;
}
