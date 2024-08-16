[PrimeNg Button Docs](https://primeng.org/button)
[Severity in config is](https://primeng.org/button#severity)
[Icons](https://primeng.org/icons#list) 

The config specifies the attributes provided by the library above, typed in `CustomButtonConfig`. You can add them if something is missing there.

It's better to use `(clickEmitter)=“foo()”` than ~~`(click)=“foo()”`~~, because (click) works even when disabled.
If you have a solution to this error, please fix it and show ✨.

Example:

```html
      <app-custom-button
        [config]="{ raised: true, label: 'Reset Card' }"
        (clickEmitter)="onReset()"
      ></app-custom-button>

      <app-custom-button
        class="m-4"
        [config]="{
          severity: 'secondary',
          label: 'favorite',
          icon: 'pi pi-heart'
        }"
        [routerLink]="['/main/favorite']"
      ></app-custom-button>

      <app-custom-button
        [config]="{
            raised: true,
            icon: 'pi pi-angle-double-left',
            label: isAuth(),
          }"
        [routerLink]="['']"
      />
```
