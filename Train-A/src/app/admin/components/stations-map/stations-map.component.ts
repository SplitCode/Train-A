import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-stations-map',
  standalone: true,
  imports: [],
  templateUrl: './stations-map.component.html',
  styleUrl: './stations-map.component.scss',
})
export class StationsMapComponent implements AfterViewInit {
  private map!: L.Map;

  markers: L.Marker[] = [L.marker([55.678, 24.34]), L.marker([57.678, 26.34])];

  private initializeMap() {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
  }

  private addMarkers() {
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private centerMap() {
    const bounds = L.latLngBounds(
      this.markers.map((marker) => marker.getLatLng()),
    );
    this.map.fitBounds(bounds);
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }
}
