import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { StationsItem } from '../../../redux/states/stations.state';
import { selectAllStations } from '../../../redux/selectors/stations.selectors';
import { Observable, Subscription } from 'rxjs';
import { createSelectStation } from '../../../redux/actions/stations.actions';

@Component({
  selector: 'app-stations-map',
  standalone: true,
  imports: [],
  templateUrl: './stations-map.component.html',
  styleUrl: './stations-map.component.scss',
})
export class StationsMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;

  private subscriptions: Subscription = new Subscription();

  stations$: Observable<StationsItem[]>;

  markers: L.Marker[] = [];

  constructor(private store: Store) {
    this.stations$ = this.store.select(selectAllStations);
  }

  private initializeMap() {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    }).setView([0, 0], 2);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
  }

  private addMarkers(stations: StationsItem[]): void {
    this.markers.forEach((marker) => marker.remove());

    this.markers = [];

    stations.forEach((station) => {
      const marker = L.marker([station.latitude, station.longitude])
        .addTo(this.map)
        .bindPopup(`Station: ${station.city}`);

      this.markers.push(marker);

      marker.on('click', () => {
        this.store.dispatch(createSelectStation({ id: station.id }));
      });

      marker.on('popupclose', () => {
        this.store.dispatch(createSelectStation({ id: null }));
      });
    });

    this.centerMap();
  }

  private centerMap() {
    if (this.markers.length > 0) {
      const group = new L.FeatureGroup(this.markers);
      const bounds = group.getBounds();

      if (bounds.isValid()) {
        this.map.fitBounds(bounds);
      } else {
        console.warn('Bounds are not valid, skipping fitBounds.');
      }
    } else {
      console.warn('No markers available to center the map.');
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.centerMap();

    this.stations$.subscribe((stations) => {
      this.addMarkers(stations);
    });
    this.subscriptions.add(this.stations$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
