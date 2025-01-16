import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SharedDataService } from '../shared-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-details',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signup-details.component.html',
  styleUrl: './signup-details.component.scss'
})
export class SignupDetailsComponent implements OnInit {
  detailsForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService) {
    this.detailsForm = this.fb.group({
      title: ['Mr', Validators.required],
      name: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: [''],
      referredBy: [''],
    });
  }

  ngOnInit() {
    this.detailsForm.get('dob')?.valueChanges.subscribe((dob: string) => {
      if (dob) {
        const age = this.calculateAge(dob);
        this.detailsForm.get('age')?.setValue(age, { emitEvent: false });
      }
    });

    const formData = this.sharedDataService.getFormData();
    if (formData) {
      this.detailsForm.patchValue({
        name: formData.name,
        gender: formData.gender,
        email: formData.email,
      });
    }
  }

  calculateAge(dob: string): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (birthDate > today) {
      alert('Please select the valid date')
      return 0;
    }

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      console.log('Form Data:', this.detailsForm.value);
    }
  }
}
