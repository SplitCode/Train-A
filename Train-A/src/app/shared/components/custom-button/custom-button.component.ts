import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomButtonConfig } from './custom-button.config.interface';
import { PRIME_NG_MODULES } from '../../modules/prime-ng-modules';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [PRIME_NG_MODULES.ButtonModule],
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() public config?: CustomButtonConfig;

  @Output() public clickEmitter = new EventEmitter<void>();

  public handleEvent(event: Event) {
    if (this.config?.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.clickEmitter.emit();
  }
}
