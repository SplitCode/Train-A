import { createReducer, on } from '@ngrx/store';
import { StationsState, initialStationsState } from '../states/stations.state';
import {
  createSelectStation,
  createStation,
  createStationFailure,
  createStationSuccess,
  deletedStation,
  deletedStationFailure,
  deletedStationSuccess,
  loadStations,
  loadStationsFailure,
  loadStationsSuccess,
  stationModal,
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
    (state, {}): StationsState => ({
      ...state,
      // stations: [station, ...state.stations],
    }),
  ),
  on(
    createStationFailure,
    (state, { error }): StationsState => ({
      ...state,
      error,
    }),
  ),

  on(
    createSelectStation,
    (state, { id }): StationsState => ({
      ...state,
      selectedStationID: id,
    }),
  ),

  on(deletedStation, (state): StationsState => {
    return {
      ...state,
    };
  }),
  on(
    deletedStationSuccess,
    (state, { stationId }): StationsState => ({
      ...state,
      stations: state.stations.filter((station) => station.id !== stationId),
    }),
  ),
  on(
    deletedStationFailure,
    (state, { error }): StationsState => ({
      ...state,
      error,
    }),
  ),
  on(
    stationModal,
    (state, { modalInfo }): StationsState => ({
      ...state,
      modalInfo: modalInfo,
    }),
  ),
);
