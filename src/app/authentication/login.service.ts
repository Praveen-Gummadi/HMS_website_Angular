import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7241/api/UsersAuth';

  constructor(private http: HttpClient) {}

  generateOtp(mobileNumber: string) {
    return this.http.post(`${this.apiUrl}/Login`, { mobileNumber });
  }

  verifyOtp(mobileNumber: string, otp: string) {
    return this.http.post(`${this.apiUrl}/verify-otp`, { mobileNumber, otp });
  }





}
