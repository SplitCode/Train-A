import { createReducer, on } from '@ngrx/store';
import {
  createCarriage,
  loadCarriagesSuccess,
  showCarriageForm,
  updateCarriage,
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
  on(updateCarriage, (state, { updatedCarriage }) => {
    const carriageIndex = state.carriages.findIndex(
      (carriage) => carriage.code === updatedCarriage.code,
    );
    if (carriageIndex !== -1) {
      const updatedCarriages = [...state.carriages];
      updatedCarriages[carriageIndex] = {
        ...updatedCarriages[carriageIndex],
        ...updatedCarriage,
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
    createCarriage,
    (state, { createdCarriage }): CarriageState => ({
      ...state,
      carriages: [...state.carriages, createdCarriage],
    }),
  ),
);
