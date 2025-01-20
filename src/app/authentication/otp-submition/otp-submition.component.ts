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

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.mobileNumber = params['mobile'];
    });
  }

  onSubmitOtp() {
    console.log('otp:', this.otp);
    console.log('WhatsApp Consent:', this.isWhatsAppChecked);
    this.loginService.verifyOtp(this.mobileNumber, this.otp).subscribe({
      next: () => {
        alert('OTP verified successfully');
        this.router.navigate(['/signupdetails'], {queryParams:  {key: "Praveen"} });
      },
      error: (err) => alert('Error verifying OTP: ' + err.message),
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

  resendotp() {}
}
