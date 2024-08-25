import { createReducer, on } from '@ngrx/store';
import { StationsState, initialStationsState } from '../states/stations.state';
import {
  createStation,
  createStationFailure,
  createStationSuccess,
  loadStations,
  loadStationsFailure,
  loadStationsSuccess,
} from '../actions/stations.actions';

export const stationsReducer = createReducer(
  initialStationsState,
  on(
    loadStations,
    (state): StationsState => ({
      ...state,
    }),
  ),
  on(
    loadStationsSuccess,
    (state, { stations }): StationsState => ({
      ...state,
      stations,
    }),
  ),
  on(
    loadStationsFailure,
    (state, { error }): StationsState => ({
      ...state,
      error,
    }),
  ),

  on(createStation, (state): StationsState => {
    return {
      ...state,
    };
  }),
  on(
    createStationSuccess,
    (state, { station }): StationsState => ({
      ...state,
      stations: [station, ...state.stations],
    }),
  ),
  on(
    createStationFailure,
    (state, { error }): StationsState => ({
      ...state,
      error,
    }),
  ),
);
