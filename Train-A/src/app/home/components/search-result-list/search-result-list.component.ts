import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { Observable } from 'rxjs';
import {
  Direction,
  ModalInfo,
  Routes,
  SearchItem,
} from '../../../redux/states/search.state';
import {
  selectFromToStationIds,
  selectModalInfo,
  selectSearch,
} from '../../../redux/selectors/search.selectors';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FormatDayPipe } from '../../pipes/format-day.pipe';
import { SearchItemComponent } from '../search-item/search-item.component';
import { RouteButtonComponent } from '../route-button/route-button.component';
import { RouteModalComponent } from '../route-modal/route-modal.component';

@Component({
  selector: 'app-search-result-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TabViewModule,
    ScrollingModule,
    FormatDatePipe,
    FormatDayPipe,
    SearchItemComponent,
    RouteButtonComponent,
    RouteModalComponent,
  ],
  templateUrl: './search-result-list.component.html',
  styleUrl: './search-result-list.component.scss',
})
export class SearchResultListComponent implements OnInit {
  public searchItem$: Observable<SearchItem>;

  public fromToIds$: Observable<{ fromStationId: number; toStationId: number }>;

  private modalInfo$: Observable<ModalInfo>;

  public routes!: Routes[];

  public cityFromTo!: Direction[];

  public modalInfo!: ModalInfo;

  constructor(private store: Store) {
    this.searchItem$ = this.store.select(selectSearch);
    this.fromToIds$ = this.store.select(selectFromToStationIds);
    this.modalInfo$ = this.store.select(selectModalInfo);
  }

  ngOnInit(): void {
    this.searchItem$.subscribe((item) => {
      this.cityFromTo = [item.from, item.to];
      this.routes = item.routes;

      console.log(item);
    });

    this.modalInfo$.subscribe((item) => {
      this.modalInfo = item;
    });
  }

  public indexOfStart(item: Routes): number {
    return item.path.indexOf(this.cityFromTo[0].stationId);
  }

  public indexOfEnd(item: Routes): number {
    return item.path.indexOf(this.cityFromTo[1].stationId);
  }
}
