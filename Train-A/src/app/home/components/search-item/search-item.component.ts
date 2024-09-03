import { Component, Input, OnInit } from '@angular/core';
import { Direction, Segments } from '../../../redux/states/search.state';
import { FullTimePipe } from '../../pipes/full-time.pipe';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { StationCityByIdPipe } from '../../pipes/station-sity-by-id.pipe';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, FullTimePipe, KeyValuePipe, StationCityByIdPipe],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() cityFromTo: Direction[] = [];

  @Input() segment!: Segments;

  @Input() path!: number[];

  ngOnInit(): void {
    // console.log(this.segment);
  }
}
