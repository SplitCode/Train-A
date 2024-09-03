interface Price {
  [key: string]: number;
}
export interface Segment {
  time: string[];
  price: Price;
  occupiedSeats: number[];
}
export interface Schedule {
  rideId?: number;
  segments: Segment[];
}

export interface RideResponse {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}
