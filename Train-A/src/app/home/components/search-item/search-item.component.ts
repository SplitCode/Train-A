import { Component, Input, OnInit } from '@angular/core';
import { Segments } from '../../../redux/states/search.state';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { GetTimePipe } from '../../pipes/get-time.pipe';
import { FullTimePipe } from '../../pipes/full-time.pipe';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    CommonModule,
    FormatDatePipe,
    GetTimePipe,
    FullTimePipe,
    KeyValuePipe,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() cityFromTo: string[] = [];

  @Input() segment!: Segments;

  ngOnInit(): void {}
}
