import { createReducer, on } from '@ngrx/store';
import { updateTrainArraySuccess } from '../actions/train.actions';
import { initialState, TrainState } from '../states/train.state';

export const trainReducer = createReducer(
  initialState,
  on(updateTrainArraySuccess, (state, { trainArray }): TrainState => {
    return {
      ...state,
      trainArray,
    };
  }),
);
