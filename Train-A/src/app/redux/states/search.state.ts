export interface SearchForm {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  time: number;
}

export interface SearchItem {
  form: Direction;
  routes: Routes[];
  to: Direction;
}

export interface SearchState {
  searchItem: SearchItem;
  error: string;
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

export interface Segments {
  occupiedSeats: number[];
  time: string[];
  price: Price[];
}

export interface Price {
  [key: string]: string;
}

export const initialSearchState: SearchState = {
  error: '',
  searchItem: {
    form: {
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
