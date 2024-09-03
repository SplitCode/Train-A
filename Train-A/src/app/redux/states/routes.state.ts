import { RoutesItem } from '../../admin/models/routes-item.interface';

export interface RoutesState {
  routes: RoutesItem[];
  formVisible: boolean;
  mode: 'create' | 'update';
  route: RoutesItem | null;
}

export const initialRoutesState: RoutesState = {
  routes: [],
  formVisible: false,
  mode: 'create',
  route: null,
};
