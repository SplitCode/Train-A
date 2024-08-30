import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { Observable } from 'rxjs';
import { Routes, SearchItem } from '../../../redux/states/search.state';
import { selectSearch } from '../../../redux/selectors/search.selectors';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FormatDayPipe } from '../../pipes/format-day.pipe';

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
  ],
  templateUrl: './search-result-list.component.html',
  styleUrl: './search-result-list.component.scss',
})
export class SearchResultListComponent implements OnInit {
  public searchItem$: Observable<SearchItem>;

  public routes!: Routes[];

  constructor(private store: Store) {
    this.searchItem$ = this.store.select(selectSearch);
  }

  ngOnInit(): void {
    this.searchItem$.forEach((item) => {
      this.routes = item.routes;
      console.log(item);
    });
  }
}
