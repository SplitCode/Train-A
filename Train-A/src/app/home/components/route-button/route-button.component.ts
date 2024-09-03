import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteButtonConfig } from '../../models/route-button.config';

@Component({
  selector: 'app-route-button',
  templateUrl: './route-button.component.html',
  standalone: true,
  imports: [CustomButtonComponent],
})
export class RouteButtonComponent extends CustomButtonComponent {
  @Input() public routeButtonConfig?: RouteButtonConfig;

  @Output() public override clickEmitter = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  override handleEvent(event: Event) {
    super.handleEvent(event);
    console.log('event');
    if (!this.config?.disabled && this.routeButtonConfig) {
      this.router.navigate([`trip/${this.routeButtonConfig.rideId}`], {
        queryParams: {
          from: this.routeButtonConfig.fromStationId,
          to: this.routeButtonConfig.toStationId,
        },
        relativeTo: this.route,
      });
    }
  }
}
