import { PRIME_NG_MODULES } from './shared/modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { appInit } from './redux/actions/app.actions';
import { Store } from '@ngrx/store';
import { loadCarriages } from './redux/actions/carriage.actions';
import { loadStations } from './redux/actions/stations.actions';
import { loadRoutes } from './redux/actions/routes.actions';
// import { getOrders } from './redux/actions/order.actions';
import { OrderService } from './order/services/order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    PRIME_NG_MODULES.ToastModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store,
    private orderService: OrderService,
  ) {
    this.store.dispatch(appInit());
  }

  public ngOnInit() {
    this.primengConfig.ripple = true;
    this.dispatchCarriages();
    this.dispatchStations();
    this.dispatchRoutes();
    this.dispatchOrders();
  }

  private dispatchCarriages(): void {
    this.store.dispatch(loadCarriages());
  }

  private dispatchRoutes(): void {
    this.store.dispatch(loadRoutes());
  }

  private dispatchStations(): void {
    this.store.dispatch(loadStations());
  }

  private dispatchOrders(): void {
    // this.orderService.getOrders(false);
  }
}
