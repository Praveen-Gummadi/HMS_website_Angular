import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../../authentication/auth.service';
import { LocationsService } from '../../../services/locations.service';


@Component({
  selector: 'app-basicinfo',
  standalone: true,
  imports: [SharedModule, MatButtonToggleModule],
  templateUrl: './basicinfo.component.html',
  styleUrl: './basicinfo.component.scss'
})

export class BasicinfoComponent implements OnInit {
  detailsForm: FormGroup | any;
  isEditing = false;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  user: any = {};

  isSignedIn: boolean = false;
  locationDetails: string = '';
  countryparameter: string = '';
  stateparameter: string = '';
  countrycode_store = '';
  statecode_store = '';

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private locationService: LocationsService ) {}

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();

    if (this.isSignedIn) {
      this.locationDetails = String(localStorage.getItem('userAddress'));
      const addressParts = this.locationDetails.split(', ');
      this.user.address = addressParts[0] || '';
      this.user.city = addressParts[1] || '';
      this.user.state = addressParts[2] || '';
      this.user.country = addressParts[4] || '';
      this.user.zip = addressParts[3] || '';
      this.detailsForm = this.fb.group({
        title: [''],
        name: [(localStorage.getItem('username')), Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dob: [''],
        age: ['', Validators.required],
        email: [String(localStorage.getItem('useremail'))],
        mobile: [String(localStorage.getItem('usermobile')), Validators.required],
        address: [this.user.address, Validators.required],
        mandal: [''],
        country: [String(localStorage.getItem('useremail')), Validators.required],
        state: [this.user.state, Validators.required],
        city: [this.user.city, Validators.required],
        zip: [this.user.zip, Validators.required]
      });
    } else {
      this.detailsForm = this.fb.group({
        title: [''],
        name: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dob: [''],
        age: ['', Validators.required],
        email: [''],
        mobile: ['', Validators.required],
        address: ['', Validators.required],
        mandal: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required]
      });
    }


    this.fetchCountriesFromAPI();


  }

  fetchCountriesFromAPI() {
    this.locationService.fetchCountriesAPI().subscribe((data) => {
        this.countries = data.map((country) => country.name).sort();

        // Ensure stored country is part of the list
        if (this.user.country && !this.countries.includes(this.user.country)) {
          this.countries.unshift(this.user.country); // Add it to the list if missing
        }

        // Set default selection
        if (this.user.country) {
          this.detailsForm.patchValue({ country: this.user.country });

          const selectedCountry = data.find((country) => country.name === this.user.country);
          if (selectedCountry) {
            this.countryparameter = selectedCountry.isoCode;

            this.fetchStates(this.countryparameter);
          }
        }
      });


  }

  fetchStates(parameter: string) {
    // Example: Fetch from an API or use a predefined list
    this.locationService.fetchStatesAPI(parameter).subscribe((data) => {
        this.states = data.map((state) => state.name).sort();

        // Ensure the stored state is part of the list
        if (this.user.state && !this.states.includes(this.user.state)) {
          this.states.unshift(this.user.state); // Add it to the list if missing
        }

        // Set default selection
        if (this.user.state) {
          this.detailsForm.patchValue({ state: this.user.state });

          const selectedState = data.find((state) => state.name === this.user.state);
          if (selectedState) {
            this.stateparameter = selectedState.isoCode;

            this.fetchcities(parameter, this.stateparameter);
          }
        }
      });
  }

  fetchcities(parameter0: string, parameter1: string) {
    // Example: Fetch from an API or use a predefined list
    this.locationService.fetchCitiesAPI(parameter0, parameter1).subscribe((data) => {
        this.cities = data.map((city) => city.name).sort();

        // Ensure the stored state is part of the list
        if (this.user.city && !this.cities.includes(this.user.state)) {
          this.cities.unshift(this.user.city);
        }

        // Set default selection
        if (this.user.city) {
          this.detailsForm.patchValue({ city: this.user.city });
        }
      });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  save() {
    this.detailsForm
    this.http.put('/api/update-user', this.detailsForm.value).subscribe(() => {
      this.isEditing = false;
    });
  }
}
