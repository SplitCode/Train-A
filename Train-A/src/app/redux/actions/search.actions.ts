import { createAction, props } from '@ngrx/store';
import { ModalInfo, SearchForm, SearchItem } from '../states/search.state';

export const loadSearch = createAction(
  '[Load Search Object] Load Search',
  props<{ form: SearchForm }>(),
);

export const loadSearchSuccess = createAction(
  '[Load Search Object] Load Search Success',
  props<{ search: SearchItem }>(),
);

export const loadSearchFailure = createAction(
  '[Load Search Object] Load Search Failure',
  props<{ error: string }>(),
);

export const loadModalInfo = createAction(
  '[Load Modal Info] Load Search Modal Info',
  props<{ modalInfo: ModalInfo }>(),
);
