import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      whatsappOptIn: [false],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.sharedDataService.setFormData(this.signupForm.value);
      console.log('Form Submitted:', this.signupForm.value);
    }
  }
}
