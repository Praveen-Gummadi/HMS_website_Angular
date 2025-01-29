import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-myheader',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './myheader.component.html',
  styleUrl: './myheader.component.scss'
})
export class MyheaderComponent {

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
    this.router.navigate(['/signin']);
  }

  onAccountClick(): void {
    if (!this.isSignedIn) {
      this.router.navigate(['/signin']);
    }
  }

}
