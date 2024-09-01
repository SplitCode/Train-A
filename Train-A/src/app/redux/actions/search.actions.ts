import { createAction, props } from '@ngrx/store';
import { SearchForm, SearchItem } from '../states/search.state';

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
