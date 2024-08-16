import { ActionReducer } from '@ngrx/store';
import { AppState } from '../states/app.state';

export function actionStateLogger(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    console.log('State before action: ', state);
    console.log('Dispatched action: ', action);

    return reducer(state, action);
  };
}
