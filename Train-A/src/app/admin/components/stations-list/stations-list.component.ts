import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselModule } from 'primeng/carousel';
import { Observable } from 'rxjs';
import { ModalInfo, StationsItem } from '../../../redux/states/stations.state';
import {
  selectAllStations,
  selectModalInfo,
} from '../../../redux/selectors/stations.selectors';
import { CommonModule } from '@angular/common';
import { StationsItemComponent } from '../stations-item/stations-item.component';
import { DialogModule } from 'primeng/dialog';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import {
  deletedStation,
  stationModal,
} from '../../../redux/actions/stations.actions';

@Component({
  selector: 'app-stations-list',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    StationsItemComponent,
    DialogModule,
    CustomButtonComponent,
  ],
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss',
})
export class StationsListComponent implements OnInit {
  stations$: Observable<StationsItem[]>;

  modalInfo$!: Observable<ModalInfo>;

  visible!: boolean;

  localModalInfo!: ModalInfo;

  responsiveOptions!: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[];

  constructor(private store: Store) {
    this.stations$ = this.store.select(selectAllStations);
    this.modalInfo$ = this.store.select(selectModalInfo);
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

    this.modalInfo$.forEach((item) => {
      this.localModalInfo = { ...item };
    });
  }

  public deleteStation() {
    console.log(this.localModalInfo.stationInfo.id);

    this.store.dispatch(
      deletedStation({ id: this.localModalInfo.stationInfo.id }),
    );
  }

  public closeModal() {
    this.store.dispatch(
      stationModal({
        modalInfo: {
          visibleModal: false,
          stationInfo: {
            id: 0,
            city: '',
          },
        },
      }),
    );
  }
}
