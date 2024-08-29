import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StationsItem, StationsState } from './../states/stations.state';

export const selectStationsState =
  createFeatureSelector<StationsState>('stationsState');

export const selectAllStations = createSelector(
  selectStationsState,
  (state: StationsState) => state.stations,
);

export const selectSelectedStationID = createSelector(
  selectStationsState,
  (state: StationsState) => state.selectedStationID,
);
export const selectSelectedStation = createSelector(
  selectAllStations,
  selectSelectedStationID,
  (stations: StationsItem[], selectedStationID: number | null) => {
    return stations.find((station) => station.id === selectedStationID) || null;
  },
);

export const selectModalInfo = createSelector(
  selectStationsState,
  (state: StationsState) => state.modalInfo,
);

export const selectStationCityByID = (stationID: number) =>
  createSelector([selectAllStations], (stations) => {
    const foundStation = stations.find((station) => station.id === stationID);
    console.log(foundStation?.city);
    return foundStation ? foundStation.city : `StationID ${stationID}`;
  });
