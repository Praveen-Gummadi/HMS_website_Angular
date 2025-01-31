import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  mobile: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private loginService: LoginService,) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      whatsappOptIn: [false],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.signupForm.controls['mobile'].setValue(params['key']);
        this.mobile = params['key']
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.router.navigate(['/otp'], { queryParams: { key: this.mobile } });
      this.loginService.generateOtp(this.mobile).subscribe({
        next: (response: any) => {
          if (response.statusCode === 403) {
            this.router.navigate(['/otp'], { queryParams: { key: this.mobile } });
          } else {
            console.error('Unexpected error:', response.errorMessages.join(', '));
            alert('Unexpected error: ' + response.errorMessages.join(', '));
          }
        },
      });
    }
  }
}
