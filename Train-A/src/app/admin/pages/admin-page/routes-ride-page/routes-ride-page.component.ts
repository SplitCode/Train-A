import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadRouteById } from '../../../../redux/actions/routes.actions';
import { selectRoute } from '../../../../redux/selectors/routes.selectors';
import { Observable } from 'rxjs';
import { RoutesItem } from '../../../models/routes-item.interface';
import { RideListComponent } from '../../../components/route/ride-list/ride-list.component';

@Component({
  selector: 'app-routes-ride-page',
  standalone: true,
  imports: [RideListComponent, CommonModule],
  templateUrl: './routes-ride-page.component.html',
})
export class RoutesRidePageComponent implements OnInit {
  id: string = '';

  public route$: Observable<RoutesItem>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.route$ = this.store.select(selectRoute) as Observable<RoutesItem>;
  }

  ngOnInit(): void {
    this.store.dispatch(loadRouteById({ routeId: this.id }));
  }
}
