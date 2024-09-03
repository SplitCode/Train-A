import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class HomePageComponent implements OnInit {
  ngOnInit() {}
}
