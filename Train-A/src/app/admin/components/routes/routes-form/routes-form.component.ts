import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import {
  createRoute,
  hideRouteForm,
  updateRoute,
} from '../../../../redux/actions/routes.actions';
import { Observable, Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import {
  selectRouteFormMode,
  selectRouteFormVisibility,
} from '../../../../redux/selectors/routes.selectors';

@Component({
  selector: 'app-routes-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    CustomButtonComponent,
  ],
  templateUrl: './routes-form.component.html',
  styleUrl: './routes-form.component.scss',
})
export class RoutesFormComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  public isVisible: boolean = false;

  public currentMode: 'create' | 'update' = 'create';

  public routeForm: FormGroup;

  public isVisible$: Observable<boolean>;

  public currentMode$: Observable<'create' | 'update'>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.routeForm = this.createForm();
    this.isVisible$ = this.store.select(selectRouteFormVisibility);
    this.currentMode$ = this.store.select(selectRouteFormMode);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.isVisible$.subscribe((visible) => {
        this.isVisible = visible;
      }),
    );
    this.subscriptions.add(
      this.currentMode$.subscribe((mode) => {
        this.currentMode = mode;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm(): FormGroup {
    return this.fb.group({
      path: ['', Validators.required],
      carriages: ['', Validators.required],
    });
  }

  closeDialog() {
    this.store.dispatch(hideRouteForm());
  }

  onSubmit() {
    if (this.routeForm.valid) {
      this.subscriptions.add(
        this.currentMode$.subscribe((mode) => {
          if (mode === 'create') {
            this.store.dispatch(createRoute({ route: this.routeForm.value }));
          } else {
            this.store.dispatch(updateRoute({ route: this.routeForm.value }));
          }
          this.closeDialog();
        }),
      );
    }
  }
}
