import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselModule } from 'primeng/carousel';
import { Observable } from 'rxjs';
import { StationsItem } from '../../../redux/states/stations.state';
import { selectAllStations } from '../../../redux/selectors/stations.selectors';
import { CommonModule } from '@angular/common';
import { StationsItemComponent } from '../stations-item/stations-item.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-stations-list',
  standalone: true,
  imports: [CommonModule, CarouselModule, StationsItemComponent, DialogModule],
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss',
})
export class StationsListComponent implements OnInit {
  stations$: Observable<StationsItem[]>;

  responsiveOptions!: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[];

  constructor(private store: Store) {
    this.stations$ = this.store.select(selectAllStations);
  }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
