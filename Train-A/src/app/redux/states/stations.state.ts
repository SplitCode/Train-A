export interface ConnectedStations {
  id?: number;
  distance?: number;
}

export interface StationsItem {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedStations[];
}

export interface StationsState {
  stations: StationsItem[];
  error: string;
}

export const initialStationsState: StationsState = {
  stations: [],
  error: '',
};
