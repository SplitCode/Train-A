import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  standalone: true,
  imports: [TabMenuModule],
})
export class AdminPageComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Stations',
        icon: 'pi pi-fw pi-map-marker',
        routerLink: 'stations',
      },
      {
        label: 'Carriages',
        icon: 'pi pi-fw pi-stop',
        routerLink: 'carriages',
      },
      { label: 'Routes', icon: 'pi pi-fw pi-sitemap', routerLink: 'routes' },
    ];
  }
}
