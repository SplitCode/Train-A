import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Schedule } from '../../../../redux/states/search.state';
import { RoutesItemByPath } from '../../../models/routes-item.interface';

import { RideItemComponent } from '../ride-item/ride-item.component';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [
    CommonModule,
    RideItemComponent,
    PRIME_NG_MODULES.PanelModule,
    PRIME_NG_MODULES.DividerModule,
  ],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss',
})
export class RideListComponent {
  @Input() data!: RoutesItemByPath;
}
