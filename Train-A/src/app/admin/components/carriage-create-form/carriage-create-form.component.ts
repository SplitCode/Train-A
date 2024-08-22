import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFormVisibleForCarriageCode } from '../../../redux/selectors/carriage.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carriage-create-form',
  templateUrl: './carriage-create-form.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CarriageCreateFormComponent implements OnInit {
  public formVisibleForCarriageCode$!: Observable<string | null>;

  constructor(private store: Store) {}

  public ngOnInit() {
    this.formVisibleForCarriageCode$ = this.store.select(
      selectFormVisibleForCarriageCode,
    );
  }
}
