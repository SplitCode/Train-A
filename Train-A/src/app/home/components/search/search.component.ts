import { SearchForm } from './../../../redux/states/search.state';
import { ConnectedStations } from './../../../redux/states/stations.state';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';
import {
  selectIsSearch,
  selectIsSearchFounded,
} from '../../../redux/selectors/search.selectors';

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
    SearchResultListComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, AfterViewChecked {
  public allStation$: Observable<StationsItem[]>;

  public isSearched: Observable<boolean>;

  public firstFound: Observable<boolean>;

  public connectedStations: { cityName: string; cityId: number }[] = [];

  public searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cd: ChangeDetectorRef,
    private getCityByIDService: GetCityByIDService,
  ) {
    this.allStation$ = this.store.select(selectAllStations);
    this.isSearched = this.store.select(selectIsSearch);
    this.firstFound = this.store.select(selectIsSearchFounded);

    this.searchForm = this.fb.group({
      city1: [[], Validators.required],
      city2: [[], Validators.required],
      date: [[] || null, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  public onSubmit() {
    let findCity!: StationsItem;

    this.findCity(this.searchForm.value.city2.cityId).subscribe((city) => {
      if (city) {
        findCity = city;
      } else {
        console.log('Not found');
      }
    });

    const submitedForm: SearchForm = {
      fromLatitude: this.searchForm.value.city1.latitude,
      fromLongitude: this.searchForm.value.city1.longitude,
      toLatitude: findCity.latitude,
      toLongitude: findCity.longitude,
      time: this.searchForm.value.date[0].toISOString(),
    };

    this.store.dispatch(loadSearch({ form: submitedForm }));
  }

  public onHide() {
    this.connectedStations = [];

    this.searchForm.value.city1.connectedTo.forEach(
      (city: ConnectedStations) => {
        this.getCityByIDService.getCityByID(city.id).subscribe((cityName) => {
          if (cityName) {
            this.connectedStations.push({ cityName, cityId: city.id });
          }
        });
      },
    );

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
