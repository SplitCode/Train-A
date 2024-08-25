import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent {
  public triggerCreate(): void {
    console.log('click');
  }
}
