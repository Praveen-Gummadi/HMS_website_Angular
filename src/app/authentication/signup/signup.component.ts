import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sharedDataService: SharedDataService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      whatsappOptIn: [false],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.sharedDataService.setFormData(this.signupForm.value);
      this.router.navigate(['/signupdetails'], {queryParams:  {key: "Praveen"} });
      console.log('Form Submitted:', this.signupForm.value);
    }
  }
}
