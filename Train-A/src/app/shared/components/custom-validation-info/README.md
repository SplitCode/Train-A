Example:

```html
  <div class="text-center flex flex-col">

    <p-calendar
      formControlName="creationDate"
      placeholder="Date(not future)"
      [showIcon]="true"
      [iconDisplay]="'input'"
    />
    <app-custom-validation-info
      [config]="{
        control: adminForm.get('creationDate'),
        requiredMessage: 'Please enter a creation date',
        validMessage: 'The creation date is valid',
        errorMessages: [],
        customErrorMessages: {
          customValidator: adminForm.get('creationDate')?.errors?.['customValidator']
        }
      }"
    ></app-custom-validation-info>
  </div>
```
