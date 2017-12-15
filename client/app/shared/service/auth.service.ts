import { Injectable } from '@angular/core';
import { SignInData } from '../model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../model';

export const LS_TOKEN_KEY = 'scrumifyToken';

@Injectable()
export class AuthService {
  authenticated = false;
  //! Contains properties: name, email and role
  activeUser: User;

  constructor(private http: HttpClient) {
    this.checkForSessionToken();
  }

  /**
   * Send credentials to login route and saves the token in local storage on successfull login
   */
  signIn(signInData: SignInData) {
    return this.http
      .post(environment.normal_uri + '/signIn', signInData, {
        observe: 'response'
      })
      .do(resp => {
        localStorage.setItem(LS_TOKEN_KEY, resp.headers.get('X-JWT'));
        this.checkForSessionToken();
      });
  }
  /**
   * Sign out the active User and remove all connected artifacts
   */
  signOut() {
    this.authenticated = false;
    this.activeUser = null;
    localStorage.removeItem(LS_TOKEN_KEY);
  }
  /**
   * Check for token and get user information
   */
  checkForSessionToken() {
    this.activeUser = this.getJWTPayload(localStorage.getItem(LS_TOKEN_KEY));
    if (this.activeUser) {
      this.authenticated = true;
      console.log(this.activeUser);
    }
  }
  /**
   * Return the User information from the jwt payload
   */
  getJWTPayload(jwt: string): User {
    if (jwt) {
      return JSON.parse(atob(jwt.split('.')[1]));
    }
    return null;
  }
}
