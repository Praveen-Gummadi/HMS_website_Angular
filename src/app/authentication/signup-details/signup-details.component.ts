import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SharedDataService } from '../shared-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-signup-details',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './signup-details.component.html',
  styleUrl: './signup-details.component.scss'
})
export class SignupDetailsComponent implements OnInit {
  detailsForm: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  countrycode_store = '';
  statecode_store = '';

  constructor(
    private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private locationService: LocationsService,
  ) {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
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
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  ngOnInit() {
    this.detailsForm.get('dob')?.valueChanges.subscribe((dob: string) => {
      if (dob) {
        const age = this.calculateAge(dob);
        this.detailsForm.get('age')?.setValue(age, { emitEvent: false });
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.detailsForm.controls['mobile'].setValue(params['key']);
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

    this.fetchCountries();
  }

  fetchCountries() {
    this.locationService.fetchCountriesAPI().subscribe(
      (data: any[]) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }


  onCountryChange(selectedCountry: any) {
    console.log(selectedCountry);
    if (selectedCountry) {
      this.countrycode_store = selectedCountry.isoCode;
      this.states = [];
      this.cities = [];
      this.detailsForm.patchValue({ state: '', city: '' });

      this.locationService.fetchStatesAPI(this.countrycode_store).subscribe(
        (data: any[]) => {
          this.states = data;
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
  }

  compareCountries(option1: any, option2: any): boolean {
    return option1 && option2 ? option1.isoCode === option2.isoCode : option1 === option2;
  }

  onStateChange(selectedState: any) {
    if (selectedState) {
      this.cities = [];
      this.detailsForm.patchValue({ city: '' });
      this.statecode_store = selectedState.isoCode;

      this.locationService.fetchCitiesAPI(this.countrycode_store, this.statecode_store).subscribe(
        (data: any[]) => {
          this.cities = data;
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
  }

  compareStates(option1: any, option2: any): boolean {
    return option1 && option2 ? option1.isoCode === option2.isoCode : option1 === option2;
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
