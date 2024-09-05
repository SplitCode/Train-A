/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../models/order-item.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';
import { Store } from '@ngrx/store';
import {
  selectModalInfo,
  selectOrders,
} from '../../../redux/selectors/order.selectors';
import { CustomButtonComponent } from '../../../shared/components';
import { ModalInfo } from '../../../redux/states/order.state';
import {
  cancelOrder,
  getOrders,
  orderModal,
} from '../../../redux/actions/order.actions';
import { selectIsManager } from '../../../redux/selectors/user.selectors';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-list',
  imports: [
    CommonModule,
    OrderItemComponent,
    PRIME_NG_MODULES.CardModule,
    PRIME_NG_MODULES.DialogModule,
    CustomButtonComponent,
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],

  standalone: true,
})
export class OrdersListComponent implements OnInit {
  public orders$!: Observable<OrderItem[]>;

  public modalInfo$!: Observable<ModalInfo>;

  public localModalInfo!: ModalInfo;

  private isManager$: Observable<boolean>;

  private isManager: boolean = false;

  constructor(
    private store: Store,
    private orderService: OrderService,
  ) {
    this.modalInfo$ = this.store.select(selectModalInfo);
    this.isManager$ = this.store.select(selectIsManager);
  }

  ngOnInit() {
    this.orders$ = this.store.select(selectOrders);

    this.isManager$.subscribe((isManager) => {
      this.isManager = isManager;
    });
    this.store.dispatch(getOrders({ all: this.isManager }));

    this.modalInfo$.forEach((item) => {
      this.localModalInfo = { ...item };
    });

    this.modalInfo$.forEach((item) => {
      this.localModalInfo = { ...item };
    });
  }

  public cancelOrder(): void {
    this.store.dispatch(
      cancelOrder({ orderId: this.localModalInfo.orderInfo.id }),
    );

    this.store.dispatch(getOrders({ all: this.isManager }));
  }

  public closeModal() {
    this.store.dispatch(
      orderModal({
        modalInfo: {
          visibleModal: false,
          orderInfo: {
            id: 0,
          },
        },
      }),
    );
  }
}
