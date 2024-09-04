import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';

import { OrderService } from '../../order/services/order.service';

import {
  getOrders,
  getOrdersSuccess,
  getOrdersFailure,
  cancelOrder,
  cancelOrderFailure,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  cancelOrderSuccess,
} from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  private orderService = inject(OrderService);

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOrders),
      switchMap(({ all }) =>
        this.orderService.getOrders(all).pipe(
          map((orders) => getOrdersSuccess({ orders })),
          catchError((error) => of(getOrdersFailure({ error }))),
        ),
      ),
    );
  });

  cancelOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cancelOrder),
      switchMap(({ orderId }) => {
        console.log('Effect triggered for canceling order:', orderId);
        return this.orderService.cancelOrder(orderId).pipe(
          map(() => {
            console.log(
              'Order canceled successfully, dispatching deleteOrderSuccess',
            );
            return cancelOrderSuccess();
          }),
          catchError((error) => {
            console.error('Error canceling order:', error);
            return of(cancelOrderFailure({ error }));
          }),
        );
      }),
    );
  });

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
