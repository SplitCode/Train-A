export interface OrderItem {
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
  price: { [key: string]: number };
}

// export interface Price {
//   [key: string]: number;
// }

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'manager';
}

export interface TripData {
  path: number[];
  schedule: OrderSchedule;
  stationStart: number;
  stationEnd: number;
}
