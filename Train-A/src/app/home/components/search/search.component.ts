import { SearchForm } from './../../../redux/states/search.state';
import { SearchService } from './../../services/search.service';
import { ConnectedStations } from './../../../redux/states/stations.state';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { StationsItem } from '../../../redux/states/stations.state';
import { selectAllStations } from '../../../redux/selectors/stations.selectors';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { loadSearch } from '../../../redux/actions/search.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    CustomButtonComponent,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public allStation$: Observable<StationsItem[]>;

  public connectedStations!: ConnectedStations[];

  public searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private searchService: SearchService,
  ) {
    this.allStation$ = this.store.select(selectAllStations);

    this.searchForm = this.fb.group({
      city1: [[], Validators.required],
      city2: [[], Validators.required],
      date: [[] || null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public onSubmit() {
    let findCity!: StationsItem;

    this.findCity(this.searchForm.value.city2.id).subscribe((city) => {
      if (city) {
        findCity = city;
      } else {
        console.log('Not founde');
      }
    });

    const submitedForm: SearchForm = {
      fromLatitude: this.searchForm.value.city1.latitude,
      fromLongitude: this.searchForm.value.city1.longitude,
      toLatitude: findCity.latitude,
      toLongitude: findCity.longitude,
      time: this.searchForm.value.date[0].toISOString(),
    };

    console.log('FindCity', findCity);
    console.log('SearchForm', this.searchForm.value);
    console.log('SubmitedForm', submitedForm);

    // this.searchService.getSearch(submitedForm).subscribe();
    this.store.dispatch(loadSearch({ form: submitedForm }));
  }

  public onHide() {
    this.connectedStations = this.searchForm.value.city1.connectedTo;

    this.searchForm.patchValue({
      city2: '',
    });
  }

  private findCity(id: number): Observable<StationsItem | undefined> {
    return this.allStation$.pipe(
      map((stations) => stations.find((station) => station.id === id)),
    );
  }
}
