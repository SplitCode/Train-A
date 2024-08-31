import { Component, Input, OnInit } from '@angular/core';
import { Segments } from '../../../redux/states/search.state';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { GetTimePipe } from '../../pipes/get-time.pipe';
import { FullTimePipe } from '../../pipes/full-time.pipe';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [FormatDatePipe, GetTimePipe, FullTimePipe],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() cityFromTo: string[] = [];

  @Input() segment!: Segments;

  ngOnInit(): void {}
}
