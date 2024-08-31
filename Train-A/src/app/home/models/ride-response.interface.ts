interface Schedule {
  segments: Segment[];
}

interface Segment {
  time: string[];
  price: Price;
  occupiedSeats: number[];
}

interface Price {
  [key: string]: number;
}

export interface RideResponse {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}
