import { createReducer, on } from '@ngrx/store';
import { loadCarriagesSuccess } from '../actions/carriage.actions';
import { CarriageState, initialCarriageState } from '../states/carriage.state';

export const carriageReducer = createReducer(
  initialCarriageState,
  on(
    loadCarriagesSuccess,
    (state, { carriages }): CarriageState => ({
      ...state,
      carriages,
    }),
  ),
);
