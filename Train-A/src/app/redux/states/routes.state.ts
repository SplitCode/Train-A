import {
  RoutesItem,
  RoutesItemByPath,
} from '../../admin/models/routes-item.interface';

export interface RoutesState {
  routes: RoutesItem[];
  formVisible: boolean;
  mode: 'create' | 'update';
  route: RoutesItem | null;
  routeByPath: RoutesItemByPath | null;
}

export const initialRoutesState: RoutesState = {
  routes: [],
  formVisible: false,
  mode: 'create',
  route: null,
  routeByPath: null,
};
