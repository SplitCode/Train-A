import { Component, OnInit } from '@angular/core';
import { RouteButtonComponent } from '../../components/route-button/route-button.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [RouteButtonComponent, RouterOutlet],
})
export class HomePageComponent implements OnInit {
  ngOnInit() {}
}
