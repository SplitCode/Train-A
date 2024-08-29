import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [CustomButtonComponent, RouterModule],
  templateUrl: './page404.component.html',
})
export class Page404Component {}
