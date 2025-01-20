import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  mobileNumber: string = '';
  isWhatsAppChecked: boolean = false;
  isFormValid: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateForm(): void {
    this.isFormValid = this.mobileNumber.trim().length >= 10
  }

  onContinue(): void {
    console.log('Mobile Number:', this.mobileNumber);
    console.log('WhatsApp Consent:', this.isWhatsAppChecked);
    if (this.isFormValid) {
      console.log(`Sending OTP to: ${this.mobileNumber}`);

      // Simulate sending an OTP (Replace this with an actual API call)

      this.loginService.generateOtp(this.mobileNumber).subscribe({
        next: () => {
          alert('OTP sent successfully');
          this.router.navigate(['/otp-submit'], { queryParams: { mobile: this.mobileNumber } });
        },
        error: (err) => alert('Error sending OTP: ' + err.message),
      });

      this.router.navigate(['/otp'], { queryParams: { mobile: this.mobileNumber } });
      // alert(`OTP sent to mobile number ${this.mobileNumber}`);
    } else {
      alert('Please enter a valid mobile number and accept WhatsApp terms.');
    }
    // Add further logic here, e.g., calling an API
  }

}
