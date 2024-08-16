import { Component, Input } from '@angular/core';
import { PRIME_NG_MODULES } from '../../modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import { CustomValidationInfoConfig } from './custom-validation-info.config.interface';

@Component({
  selector: 'app-custom-validation-info',
  templateUrl: './custom-validation-info.component.html',
  standalone: true,
  imports: [CommonModule, PRIME_NG_MODULES.InputTextModule],
})
export class CustomValidationInfoComponent {
  @Input() config!: CustomValidationInfoConfig;

  get customErrorKeys(): string[] {
    return this.config.customErrorMessages
      ? Object.keys(this.config.customErrorMessages)
      : [];
  }
}
