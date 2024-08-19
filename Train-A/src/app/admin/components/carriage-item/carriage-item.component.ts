import { Component, Input, OnInit } from '@angular/core';
import { CarriageItem } from '../../models/carriage-item.interface';

@Component({
  selector: 'app-carriage-item',
  templateUrl: './carriage-item.component.html',
  standalone: true,
})
export class CarriageItemComponent implements OnInit {
  @Input() public config?: CarriageItem;

  ngOnInit() {}
}
