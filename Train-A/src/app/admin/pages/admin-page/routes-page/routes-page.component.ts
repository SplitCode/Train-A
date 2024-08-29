import { Component } from '@angular/core';
import { RoutesListComponent } from '../../../components/routes/routes-list/routes-list.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [RoutesListComponent],
  templateUrl: './routes-page.component.html',
})
export class RoutesPageComponent {}
