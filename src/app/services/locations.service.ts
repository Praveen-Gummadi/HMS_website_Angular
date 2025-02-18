import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private APIKEY = 'b6cc0963admsh86162cd42c354e9p192e66jsnc7418a2b6d25';
  private host = 'country-state-city-search-rest-api.p.rapidapi.co';
  private URI = 'https://country-state-city-search-rest-api.p.rapidapi.com';

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(private http: HttpClient) { }


  fetchCountriesAPI(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.APIKEY
    });

    return this.http.get<any[]>(`${this.URI}/allcountries`, { headers });
  }

  fetchStatesAPI(countryId: string) {
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.APIKEY
    });

    return this.http.get<any[]>(`${this.URI}/states-by-countrycode?countrycode=${countryId}`, { headers });
  }

  fetchCitiesAPI(countryId: string, stateId: string) {
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.APIKEY
    });

    return this.http.get<any[]>(`${this.URI}/cities-by-countrycode-and-statecode?countrycode=${countryId}&statecode=${stateId}`, { headers });
  }
}
