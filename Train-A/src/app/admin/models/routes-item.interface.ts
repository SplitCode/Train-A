import { Schedule, ScheduleTimeRide } from '../../redux/states/search.state';

export interface RoutesItem {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export interface RoutesItemByPath {
  id: number;
  path: number[];
  carriages: string[];
  schedule: ScheduleTimeRide[];
}
