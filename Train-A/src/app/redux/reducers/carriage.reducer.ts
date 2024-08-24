import { createReducer, on } from '@ngrx/store';
import {
  createCarriageSuccess,
  hideCarriageForm,
  loadCarriagesSuccess,
  showCarriageForm,
  updateCarriageSuccess,
} from '../actions/carriage.actions';
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
  on(
    showCarriageForm,
    (state, { carriageCode, mode }): CarriageState => ({
      ...state,
      formVisibleForCarriageCode: carriageCode,
      mode: mode,
    }),
  ),
  on(
    hideCarriageForm,
    (state): CarriageState => ({
      ...state,
      formVisibleForCarriageCode: null,
    }),
  ),
  on(updateCarriageSuccess, (state, { carriage }) => {
    const carriageIndex = state.carriages.findIndex(
      (c) => c.code === carriage.code,
    );
    if (carriageIndex !== -1) {
      const updatedCarriages = [...state.carriages];
      updatedCarriages[carriageIndex] = {
        ...updatedCarriages[carriageIndex],
        ...carriage,
      };
      return {
        ...state,
        carriages: updatedCarriages,
        formVisibleForCarriageCode: null,
      };
    }
    return state;
  }),
  on(
    createCarriageSuccess,
    (state, { carriage }): CarriageState => ({
      ...state,
      carriages: [carriage, ...state.carriages],
    }),
  ),
);
