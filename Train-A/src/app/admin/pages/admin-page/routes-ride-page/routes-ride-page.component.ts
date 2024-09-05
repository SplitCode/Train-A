import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
// import { RoutesService } from '../../../services/routes.service';
import { CustomButtonComponent } from '../../../../shared/components';
import { RideFormComponent } from '../../../components/route/ride-form/ride-form.component';

@Component({
  selector: 'app-routes-ride-page',
  standalone: true,
  imports: [
    RideListComponent,
    CommonModule,
    CustomButtonComponent,
    RideFormComponent,
  ],
  templateUrl: './routes-ride-page.component.html',
})
export class RoutesRidePageComponent implements OnInit {
  id: string = '';

  showRideForm: boolean = false;

  public route$: Observable<RoutesItem>;

  public routeByPath$: Observable<RoutesItemByPath>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    // this.routeByPath$ = this.store.select(
    //   selectRouteByPath,
    // ) as Observable<RoutesItemByPath>;

    // console.log(
    //   'routeByPath$',
    //   this.routesService.convertRoutesItemByPath(this.route$  );
    // );
    this.route$ = this.store.select(selectRoute) as Observable<RoutesItem>;

    this.routeByPath$ = this.store.select(
      selectRouteByPath,
    ) as Observable<RoutesItemByPath>;
  }

  ngOnInit(): void {
    this.store.dispatch(loadRouteById({ routeId: +this.id }));
  }

  goBack(): void {
    this.location.back();
  }
}
