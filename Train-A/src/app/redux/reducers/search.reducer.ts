import { createReducer, on } from '@ngrx/store';
import {
  loadModalInfo,
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
      loading: true,
      firstFound: true,
    }),
  ),
  on(
    loadSearchSuccess,
    (state, { search }): SearchState => ({
      ...state,
      searchItem: search,
      loading: false,
    }),
  ),
  on(
    loadSearchFailure,
    (state, { error }): SearchState => ({
      ...state,
      error,
    }),
  ),
  on(
    loadModalInfo,
    (state, { modalInfo }): SearchState => ({
      ...state,
      modalInfo,
    }),
  ),
);
