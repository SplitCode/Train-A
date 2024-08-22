import { createReducer, on } from '@ngrx/store';
import {
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
    (state, { carriageCode }): CarriageState => ({
      ...state,
      formVisibleForCarriageCode: carriageCode,
    }),
  ),
  on(updateCarriage, (state, { carriageCode, updatedCarriage }) => {
    const carriageIndex = state.carriages.findIndex(
      (carriage) => carriage.code === carriageCode,
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
);
