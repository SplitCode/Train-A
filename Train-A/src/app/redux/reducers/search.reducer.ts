import { createReducer, on } from '@ngrx/store';
import {
  loadSearch,
  loadSearchFailure,
  loadSearchSuccess,
} from '../actions/search.actions';
import { initialSearchState, SearchState } from '../states/search.state';

export const searchReducer = createReducer(
  initialSearchState,
  on(
    loadSearch,
    (state): SearchState => ({
      ...state,
    }),
  ),
  on(
    loadSearchSuccess,
    (state, { search }): SearchState => ({
      ...state,
      searchItem: search,
    }),
  ),
  on(
    loadSearchFailure,
    (state, { error }): SearchState => ({
      ...state,
      error,
    }),
  ),
);
