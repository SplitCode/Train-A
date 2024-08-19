import { Component, Input, OnInit } from '@angular/core';
import { CarriageItem } from '../../models/carriage-item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carriage-item',
  templateUrl: './carriage-item.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./carriage-item.scss'],
})
export class CarriageItemComponent implements OnInit {
  @Input() public config?: CarriageItem;

  ngOnInit() {}

  createRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
}
