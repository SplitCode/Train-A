import { CarriageItem } from './carriage-item.interface';
// import { PathItem } from

export interface RoutesItem {
  id: number;
  path: number[];
  // path: PathItem[];
  carriages: CarriageItem[];
}
