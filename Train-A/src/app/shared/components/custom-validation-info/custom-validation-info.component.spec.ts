import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextModule } from 'primeng/inputtext';
import { CustomValidationInfoComponent } from './custom-validation-info.component';

describe('CustomValidationInfoComponent', () => {
  let component: CustomValidationInfoComponent;
  let fixture: ComponentFixture<CustomValidationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, InputTextModule, CustomValidationInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomValidationInfoComponent);
    component = fixture.componentInstance;
    component.config = {
      control: null,
      requiredMessage: 'This field is required',
      validMessage: 'This field is valid',
      errorMessages: [{ required: 'This field is required' }],
      customErrorMessages: {
        required: 'This field is required',
        minlength: 'Minimum length is 5 characters',
      },
      initialMessage: 'Please fill out this field',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return custom error keys', () => {
    expect(component.customErrorKeys).toEqual(['required', 'minlength']);
  });

  it('should return an empty array if no custom error messages', () => {
    component.config.customErrorMessages = {};
    expect(component.customErrorKeys).toEqual([]);
  });

  it('should handle null control', () => {
    component.config.control = null;
    expect(component.config.control).toBeNull();
  });

  it('should handle required message', () => {
    expect(component.config.requiredMessage).toBe('This field is required');
  });

  it('should handle valid message', () => {
    expect(component.config.validMessage).toBe('This field is valid');
  });

  it('should handle initial message', () => {
    expect(component.config.initialMessage).toBe('Please fill out this field');
  });
});
