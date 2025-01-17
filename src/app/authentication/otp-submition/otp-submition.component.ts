import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-submition',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './otp-submition.component.html',
  styleUrl: './otp-submition.component.scss'
})
export class OtpSubmitionComponent {
  otp: string = '';
  isWhatsAppChecked: boolean = false;
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateForm(): void {
    this.isFormValid = this.otp.trim().length >= 4
  }

  resendotp() {}

  onContinue(): void {
    console.log('otp:', this.otp);
    console.log('WhatsApp Consent:', this.isWhatsAppChecked);
    if (this.isFormValid) {
      // Simulate sending an OTP (Replace this with an actual API call)
      alert(`OTP Submitted: ${this.otp}`);
      this.router.navigate(['/signupdetails'], {queryParams:  {key: "Praveen"} });
    } else {
      alert('Please enter a valid mobile number and accept WhatsApp terms.');
    }
    // Add further logic here, e.g., calling an API
  }

}
