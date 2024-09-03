import { Schedule } from '../../redux/states/search.state';

export interface RoutesItem {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}
