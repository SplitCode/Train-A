import { createAction, props } from '@ngrx/store';
import { StationsItem } from '../states/stations.state';

export const loadStations = createAction('[Carriage List] Load Stations');
export const loadStationsSuccess = createAction(
  '[Carriage List] Load Stations Success',
  props<{ stations: StationsItem[] }>(),
);
export const loadStationsFailure = createAction(
  '[Carriage List] Load Stations Failure',
  props<{ error: unknown }>(),
);
