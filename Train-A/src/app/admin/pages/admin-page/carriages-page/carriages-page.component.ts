import { Component, OnInit } from '@angular/core';
import { CarriageListComponent } from '../../../components/carriage-list/carriage-list.component';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  standalone: true,
  imports: [CarriageListComponent],
})
export class CarriagesPageComponent implements OnInit {
  ngOnInit() {}
}
