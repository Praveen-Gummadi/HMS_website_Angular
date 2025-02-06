import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-basicinfo',
  standalone: true,
  imports: [SharedModule, MatButtonToggleModule],
  templateUrl: './basicinfo.component.html',
  styleUrl: './basicinfo.component.scss'
})
export class BasicinfoComponent implements OnInit {

  isSignedIn: boolean = false;
  locationDetails: string = '';

  user = {
    title: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    email: '',
    address: '',
    mandal: '',
    location: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    referredBy: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();

    if (this.isSignedIn) {
      this.user.firstName = String(localStorage.getItem('username'));
      this.user.email = String(localStorage.getItem('useremail'));

      this.locationDetails = String(localStorage.getItem('userAddress'));
      const addressParts = this.locationDetails.split(', ');
      this.user.address = addressParts[0] || '';
      this.user.city = addressParts[1] || '';
      this.user.state = addressParts[2] || '';
      this.user.country = addressParts[4] || '';
      this.user.zip = addressParts[3] || '';
    }
  }

  save() {
    console.log('User Data:', this.user);
  }
}
