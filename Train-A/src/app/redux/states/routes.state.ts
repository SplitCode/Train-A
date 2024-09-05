import {
  RoutesItem,
  RoutesItemByPath,
} from '../../admin/models/routes-item.interface';

export interface RoutesState {
  routes: RoutesItem[];
  formVisible: boolean;
  rideFormVisible: boolean;
  mode: 'create' | 'update';
  route: RoutesItem | null;
  routeByPath: RoutesItemByPath | null;
  routeId: number | null;
  modalInfo: ModalInfo;
  error: string;
}

export const initialRoutesState: RoutesState = {
  routes: [],
  formVisible: false,
  rideFormVisible: false,
  mode: 'create',
  route: null,
  routeByPath: null,
  routeId: null,
  modalInfo: {
    visibleModal: false,
    routeInfo: {
      id: 0,
    },
  },
  error: '',
};

export interface ModalInfo {
  visibleModal: boolean;
  routeInfo: {
    id: number;
  };
}
