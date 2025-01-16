import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  mobileNumber: string = '+91 ';
  isWhatsAppChecked: boolean = false;
  isFormValid: boolean = false;

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
      // Simulate sending an OTP (Replace this with an actual API call)
      console.log(`Sending OTP to: ${this.mobileNumber}`);
      alert(`OTP sent to mobile number ${this.mobileNumber}`);
    } else {
      alert('Please enter a valid mobile number and accept WhatsApp terms.');
    }
    // Add further logic here, e.g., calling an API
  }

}
