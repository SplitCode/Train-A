import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap, tap } from 'rxjs';
import { RideService } from '../../home/services/ride.service';
import { OrderService } from '../../order/services/order.service';
import { MessageService } from 'primeng/api';
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
  cancelOrderSuccess,
  // deleteOrderSuccess,
} from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  private rideService = inject(RideService);

  private orderService = inject(OrderService);

  private messageService = inject(MessageService);

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

  cancelOrderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cancelOrderSuccess),
      tap(() => {
        console.log('cancelOrderSuccess effect triggered');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The order has been successfully cancelled!',
        });
      }),
      map(() => {
        console.log('Dispatching getOrders action');
        return getOrders();
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
