import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7241/api/UsersAuth';

  constructor(private http: HttpClient) {}

  generateOtp(mobileNumber: string) {
    return this.http.post(`${this.apiUrl}/Login`, { mobileNumber });
  }

  // verifyOtp(mobileNumber: string, otp: string) {
  //   return this.http.post(`${this.apiUrl}/verify-otp`, { mobileNumber, otp });
  // }

  async verifyOtp(mobileNumber: string, otp: string): Promise<any> {

    try {
      const response = await fetch(`${this.apiUrl}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber, otp })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }

``
    // return firstValueFrom(this.http.post(`${this.apiUrl}/verify-otp`, { mobileNumber, otp }));


    // try {
    //   return await firstValueFrom(this.http.post(`${this.apiUrl}/verify-otp`, { mobileNumber, otp }));
    // } catch (error) {
    //   console.error('Error verifying OTP:', error);
    //   throw error;
    // }
  }





}
