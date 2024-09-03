import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadRouteById } from '../../../../redux/actions/routes.actions';
import {
  selectRoute,
  selectRouteByPath,
} from '../../../../redux/selectors/routes.selectors';
import { Observable } from 'rxjs';
import {
  RoutesItem,
  RoutesItemByPath,
} from '../../../models/routes-item.interface';

import { RideListComponent } from '../../../components/route/ride-list/ride-list.component';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-routes-ride-page',
  standalone: true,
  imports: [RideListComponent, CommonModule],
  templateUrl: './routes-ride-page.component.html',
})
export class RoutesRidePageComponent implements OnInit {
  id: string = '';

  public route$: Observable<RoutesItem>;

  public routeByPath$: Observable<RoutesItemByPath>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private routesService: RoutesService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.route$ = this.store.select(selectRoute) as Observable<RoutesItem>;

    this.routeByPath$ = this.store.select(
      selectRouteByPath,
    ) as Observable<RoutesItemByPath>;
    // this.routeByPath$ = this.store.select(
    //   selectRouteByPath,
    // ) as Observable<RoutesItemByPath>;

    // console.log(
    //   'routeByPath$',
    //   this.routesService.convertRoutesItemByPath(this.route$  );
    // );
  }

  ngOnInit(): void {
    this.store.dispatch(loadRouteById({ routeId: this.id }));

    // this.store.dispatch(loadRouteByPath({ route: this.route$ }));
  }
}
