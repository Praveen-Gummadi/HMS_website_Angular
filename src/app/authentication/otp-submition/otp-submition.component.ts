import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-otp-submition',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './otp-submition.component.html',
  styleUrl: './otp-submition.component.scss'
})

export class OtpSubmitionComponent implements OnInit {
  mobileNumber = String(localStorage.getItem('mobile-otp'));
  otp: string = '';
  isWhatsAppChecked: boolean = false;
  isFormValid: boolean = false;

  isResendDisabled: boolean = true;
  timer: number = 60;
  interval: any;
  responseMessage: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
    this.startTimer();
  }

  onSubmitOtp() {
    this.loginService.verifyOtp(this.mobileNumber, this.otp).subscribe({
      next: (response: any) => {
        if (response.isSuccess = 'true' )
          this.router.navigate(['/dashboard'], { queryParams: { key: response.result.token } });
          localStorage.setItem('authToken', response.result.token);
          localStorage.setItem('username', response.result?.user.firstName);
          localStorage.setItem('usermobile', response.result?.user.mobile);
          localStorage.setItem('useremail', response.result?.user.email);

          const { address, city, state, zip, country } = response.result?.user;

          const addressString = `${address}, ${city}, ${state}, ${zip}, ${country}`;

          localStorage.setItem('userAddress', addressString);
      },
      error: (error: any) => {
        this.errorMessage = error.error.errorMessages || 'An error occurred';
        alert(this.errorMessage);
        this.otp = '';
      }
    });
  }


  /////************ */

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateForm(): void {
    this.isFormValid = this.otp.trim().length >= 4
  }

  startTimer(): void {
    this.isResendDisabled = true;
    this.timer = 60;

    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.isResendDisabled = false;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendOtp(): void {
    console.log('Resend OTP API call triggered for mobile:', this.mobileNumber);
    this.startTimer();
  }
}
