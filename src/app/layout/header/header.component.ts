import { Component, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  username: string = '';
  isSignedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Get the authentication status
    this.isSignedIn = this.authService.isSignedIn();

    if (this.isSignedIn) {
      this.username = this.authService.getUsername();
    }
  }


  logout(): void {
    this.authService.logout();
    if (window.location.pathname === '/dashboard') {
      window.location.reload();
    } else if (window.location.pathname === '/doctors') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }

  onAccountClick(): void {
    if (!this.isSignedIn) {
      this.router.navigate(['/signin'], { queryParams: { url: this.router.url } });
    }
  }

}
