import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
})
export class ProfilePageComponent implements OnInit {
  ngOnInit() {}

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
