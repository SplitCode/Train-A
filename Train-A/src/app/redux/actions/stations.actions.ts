import { createAction, props } from '@ngrx/store';
import { StationsItem } from '../states/stations.state';

export const loadStations = createAction('[Stations List] Load Stations');
export const loadStationsSuccess = createAction(
  '[Stations List] Load Stations Success',
  props<{ stations: StationsItem[] }>(),
);
export const loadStationsFailure = createAction(
  '[Stations List] Load Stations Failure',
  props<{ error: string }>(),
);

export const createStation = createAction(
  '[Station] Create Station',
  props<{ station: StationsItem }>(),
);
export const createStationSuccess = createAction(
  '[Stations] Create Station Success',
  props<{ station: StationsItem }>(),
);
export const createStationFailure = createAction(
  '[Stations] Create Station Failure',
  props<{ error: string }>(),
);

export const createSelectStation = createAction(
  '[Selected Stations] Selecected Station',
  props<{ id: number | null }>(),
);

export const deletedStation = createAction(
  '[Deleted Stations] Deleted Station',
  props<{ id: number }>(),
);
export const deletedStationSuccess = createAction(
  '[Deleted Stations] Deleted Station Success',
  props<{ stationId: number }>(),
);
export const deletedStationFailure = createAction(
  '[Deleted Stations] Deleted Station Failure',
  props<{ error: string }>(),
);
