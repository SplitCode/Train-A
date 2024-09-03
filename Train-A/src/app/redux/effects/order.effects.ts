import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap } from 'rxjs';
import { RideService } from '../../home/services/ride.service';
import { OrderService } from '../../order/services/order.service';
import {
  getOrders,
  getOrdersSuccess,
  getOrdersFailure,
  getAllOrders,
  cancelOrder,
  cancelOrderFailure,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  deleteOrderSuccess,
} from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  private rideService = inject(RideService);

  private orderService = inject(OrderService);

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOrders),
      mergeMap(() =>
        this.rideService.getOrders().pipe(
          map((orders) => getOrdersSuccess({ orders })),
          catchError((error) => of(getOrdersFailure({ error }))),
        ),
      ),
    );
  });

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllOrders),
      switchMap(({ all }) =>
        this.orderService.getAllOrders(all).pipe(
          map((orders) => getOrdersSuccess({ orders })),
          catchError((error) => of(getOrdersFailure({ error }))),
        ),
      ),
    );
  });

  cancelOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cancelOrder),
      switchMap(({ orderId }) =>
        this.orderService.cancelOrder(orderId).pipe(
          map(() => deleteOrderSuccess({ orderId })),
          catchError((error) => of(cancelOrderFailure({ error }))),
        ),
      ),
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
