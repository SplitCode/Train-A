export interface ConnectedStations {
  id: number;
  distance: number;
}

export interface StationsItem {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo?: ConnectedStations[];
}

export interface ModalInfo {
  visibleModal: boolean;
  stationInfo: {
    id: number;
    city: string;
  };
}

export interface StationsState {
  stations: StationsItem[];
  error: string;
  selectedStationID: number | null;
  modalInfo: ModalInfo;
}

export const initialStationsState: StationsState = {
  stations: [],
  error: '',
  selectedStationID: null,
  modalInfo: {
    visibleModal: false,
    stationInfo: {
      id: 0,
      city: '',
    },
  },
};
