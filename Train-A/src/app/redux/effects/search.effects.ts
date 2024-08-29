import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from '../../home/services/search.service';
import { loadSearch, loadSearchSuccess } from '../actions/search.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { loadStationsFailure } from '../actions/stations.actions';
import { SearchItem } from '../states/search.state';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearch),
      concatMap(({ form }) => {
        return this.searchService.getSearch(form).pipe(
          map((search: SearchItem) => loadSearchSuccess({ search: search })),
          catchError((error) => of(loadStationsFailure({ error }))),
        );
      }),
    );
  });

  constructor(private searchService: SearchService) {}
}
