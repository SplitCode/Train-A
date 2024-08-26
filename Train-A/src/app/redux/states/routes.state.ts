import { RoutesItem } from '../../admin/models/routes-item.interface';

export interface RoutesState {
  routes: RoutesItem[];
  // formVisibleForCarriageCode: string | null;
  // mode: 'create' | 'update';
}

export const initialRoutesState: RoutesState = {
  routes: [],
  // formVisibleForCarriageCode: null,
  // mode: 'create',
};
