import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-otp-submition',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './otp-submition.component.html',
  styleUrl: './otp-submition.component.scss'
})

export class OtpSubmitionComponent implements OnInit {
  mobileNumber: string = '';
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
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.mobileNumber = params['key'];
    });

    this.startTimer();
  }

  onSubmitOtp() {
    this.loginService.verifyOtp(this.mobileNumber, this.otp).subscribe({
      next: (response: any) => {
        if (response.isSuccess = 'true' )
          this.router.navigate(['/dashboard'], { queryParams: { key: response.result.token } });
          localStorage.setItem('authToken', response.result.token);
          localStorage.setItem('username', response.result?.user.firstName);
      },
      error: (error: any) => {
        this.errorMessage = error.error.errorMessages || 'An error occurred';
        alert(this.errorMessage);
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
