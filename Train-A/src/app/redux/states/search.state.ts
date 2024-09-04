export interface SearchForm {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  time: number;
}

export interface SearchItem {
  from: Direction;
  routes: Routes[];
  to: Direction;
}

export interface Direction {
  city: string;
  geolocation: Geolocation;
  stationId: number;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface Routes {
  id: number;
  carriages: string[];
  path: number[];
  schedule: Schedule[];
}

export interface Schedule {
  rideId: number;
  segments: Segments[];
}

export interface SegmentsStation {
  id: number;
  city: number;
  departure?: string;
  arrival?: string;
  price?: Price[];
}

export interface ScheduleTimeRide {
  rideId: number;
  segments: SegmentsStation[];
}

export interface Segments {
  occupiedSeats?: number[];
  time: string[];
  price: Price[];
}

export interface Price {
  [key: string]: string;
}

export interface ModalInfo {
  isVisiblePath: boolean;
  fromStationId: string;
  toStationId: string;
  rideId: string;
  showFromToCities: boolean;
}

export interface SearchState {
  searchItem: SearchItem;
  error: string;
  loading: boolean;
  firstFound: boolean;
  modalInfo: ModalInfo;
}

export const initialSearchState: SearchState = {
  error: '',
  loading: false,
  firstFound: false,
  modalInfo: {
    isVisiblePath: false,
    fromStationId: '',
    toStationId: '',
    rideId: '',
    showFromToCities: false,
  },
  searchItem: {
    from: {
      city: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      stationId: 0,
    },
    routes: [
      {
        id: 0,
        carriages: [],
        path: [],
        schedule: [
          {
            rideId: 0,
            segments: [{ occupiedSeats: [], time: [], price: [] }],
          },
        ],
      },
    ],
    to: {
      city: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      stationId: 0,
    },
  },
};
