export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: OrderStatus;
  path: number[];
  carriages: string[];
  schedule: OrderSchedule;
  stationStart: number;
  stationEnd: number;
}

export type OrderStatus = 'active' | 'completed' | 'rejected' | 'canceled';

export interface OrderSchedule {
  segments: ScheduleSegment[];
}

export interface ScheduleSegment {
  time: string[];
  price: Price;
}

export interface Price {
  [key: string]: number;
}
