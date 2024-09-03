import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../states/search.state';

export const selectSearchState =
  createFeatureSelector<SearchState>('searchState');

export const selectSearch = createSelector(
  selectSearchState,
  (state: SearchState) => state.searchItem,
);

export const selectIsSearch = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading,
);

export const selectIsSearchFounded = createSelector(
  selectSearchState,
  (state: SearchState) => state.firstFound,
);

export const selectFromToStationIds = createSelector(
  selectSearchState,
  (state: SearchState) => ({
    fromStationId: state.searchItem.from.stationId,
    toStationId: state.searchItem.to.stationId,
  }),
);
