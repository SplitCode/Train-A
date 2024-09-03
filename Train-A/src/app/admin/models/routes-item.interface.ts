export interface RoutesItem {
  id: number;
  path: number[];
  carriages: string[];
}

export interface CreateRouteRequest {
  path: number[];
  carriages: string[];
}
