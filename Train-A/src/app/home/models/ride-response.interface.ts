interface Price {
  [key: string]: number;
}
interface Segment {
  time: string[];
  price: Price;
  occupiedSeats: number[];
}
interface Schedule {
  segments: Segment[];
}

export interface RideResponse {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}
