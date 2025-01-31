import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginService } from '../login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  mobile: string = '+91 709502497';
  isWhatsAppChecked: boolean = false;
  isFormValid: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateForm(): void {
    this.isFormValid = this.mobile.trim().length >= 10
  }

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onContinue();
    }
  }

  onContinue(): void {
    const mobileNumber = this.mobile.replace(/\D/g, '').slice(-10);
    if (this.isFormValid) {
      this.loginService.generateOtp(mobileNumber).subscribe({
        next: (response: any) => {
          localStorage.setItem('mobile-otp', mobileNumber);
          if (response.isSuccess) {
            this.router.navigate(['/otp']);
          } else if (response.statusCode === 403) {
            alert(response.result);
            // this.router.navigate(['/signup'], { queryParams: { key: mobileNumber } });
            this.router.navigate(['/signup']);
          } else {
            console.error('Unexpected error:', response.errorMessages.join(', '));
            alert('Unexpected error: ' + response.errorMessages.join(', '));
          }
        },
      });
    }
    else {
      alert('Please enter a valid mobile number and accept WhatsApp terms.');
    }
  }

}
