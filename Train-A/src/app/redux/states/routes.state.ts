import { RoutesItem } from '../../admin/models/routes-item.interface';

export interface RoutesState {
  routes: RoutesItem[];
  formVisible: boolean;
  mode: 'create' | 'update';
  routeId: number | null;
  modalInfo: ModalInfo;
  error: string;
}

export const initialRoutesState: RoutesState = {
  routes: [],
  formVisible: false,
  mode: 'create',
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
