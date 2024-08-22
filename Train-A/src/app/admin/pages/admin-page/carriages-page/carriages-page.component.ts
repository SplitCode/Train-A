import { Component, OnInit } from '@angular/core';
import { CarriageListComponent } from '../../../components/carriage-list/carriage-list.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  standalone: true,
  imports: [CarriageListComponent, CustomButtonComponent],
})
export class CarriagesPageComponent implements OnInit {
  ngOnInit() {}
}
