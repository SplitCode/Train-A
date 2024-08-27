import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-detali',
  templateUrl: './trip-detali.component.html',
  styleUrls: ['./trip-detali.component.scss'],
  standalone: true,
})
export class TripDetaliComponent implements OnInit {
  rideId: string | null = null;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.rideId = this.route.snapshot.paramMap.get('rideId');

    this.route.queryParamMap.subscribe((params) => {
      this.fromStationId = params.get('from');
      this.toStationId = params.get('to');
    });
  }
}
