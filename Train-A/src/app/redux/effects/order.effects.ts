import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';

import { OrderService } from '../../order/services/order.service';

import {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  private orderService = inject(OrderService);

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.orderService.getUsers().pipe(
          map((users) => getUsersSuccess({ users })),
          catchError((error) => of(getUsersFailure({ error }))),
        ),
      ),
    );
  });
}
