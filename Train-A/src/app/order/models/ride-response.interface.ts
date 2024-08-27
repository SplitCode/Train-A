interface Schedule {}

interface Segment {}

interface Price {
  [key: string]: number;
}

export interface RideResponse {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
  segments: Segment[];
  time: string[];
  price: Price;
  occupiedSeats: number[];
}
