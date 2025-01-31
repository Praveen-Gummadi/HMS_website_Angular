import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signedIn = false;
  private username = '';

  isSignedIn(): boolean {

    // Check if the token exists in localStorage
    const token = localStorage.getItem('authToken');

    // Optionally, validate the token (e.g., check its expiry)
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload of the JWT
      const isTokenExpired = payload.exp * 1000 < Date.now(); // Compare expiry time with current time

      if (!isTokenExpired) {
        this.signedIn = true;
        return this.signedIn;
      } else {
        localStorage.removeItem('authToken');
      }
    }

    return false;
  }

  getUsername(): string {
    this.username = localStorage.getItem('username')?? '';
    return this.username;
  }

  logout(): void {
    this.signedIn = false;
    // localStorage.removeItem('authToken');
    localStorage.clear();
    localStorage.setItem('userAddress', "Use my current location")
  }
}
