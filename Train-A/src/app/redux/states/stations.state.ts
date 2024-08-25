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

export interface StationsState {
  stations: StationsItem[];
  error: string;
  selectedStationID: number | null;
}

export const initialStationsState: StationsState = {
  stations: [],
  error: '',
  selectedStationID: null,
};
