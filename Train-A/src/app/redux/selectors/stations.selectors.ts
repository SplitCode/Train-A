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
const cache: { [key: number]: string } = {};
export const selectStationCityByID = (stationID: number) =>
  createSelector([selectAllStations], (stations) => {
    if (cache[stationID]) {
      return cache[stationID];
    }

    const foundStation = stations.find((station) => station.id === stationID);
    const city = foundStation ? foundStation.city : `StationID ${stationID}`;
    cache[stationID] = city;
    console.log(`Station ID: ${stationID}, City: ${city}`); // Логирование
    return city;
  });
