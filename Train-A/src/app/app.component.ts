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
  ) {}

  public ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.dispatch(appInit());
    this.dispatchCarriages();
    this.dispatchStations();
  }

  private dispatchCarriages(): void {
    this.store.dispatch(loadCarriages());
  }

  private dispatchStations(): void {
    this.store.dispatch(loadStations());
  }
}
