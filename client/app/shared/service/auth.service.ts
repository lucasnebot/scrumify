import { Injectable } from '@angular/core';
import { SignInData } from '../model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { User } from '../model';
import  { UserService } from './user.service';

export const LS_TOKEN_KEY = 'scrumifyToken';

interface JWTClaimSet {
  name: string;
  email: string;
  role: number;
}

@Injectable()
export class AuthService {
  authenticated = false;
  //! Contains properties: name, email and role
  activeUser: User;

  constructor(private http: HttpClient, protected userService: UserService) {
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
      .catch(err => {
        return Observable.of(null);
      })
      // ? Add subscribe here? Or add body directly
      .do(resp => {
        if (resp) {
          this.activeUser = resp.body;
          console.log(this.activeUser);
          localStorage.setItem(LS_TOKEN_KEY, resp.headers.get('X-JWT'));
          this.authenticated = true;
        }
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
   * Check for token and get user information from db
   */
  checkForSessionToken() {
    const claimSet: JWTClaimSet = this.getJWTPayload(localStorage.getItem(LS_TOKEN_KEY));
    if (claimSet) {
      // Sets some properties before querying the db to avoid angular load errors
      this.authenticated = true;
      this.activeUser = claimSet as User;

      this.userService.getAll({email: claimSet.email}).subscribe((resp) => {
        if(resp.length === 1){
          this.activeUser = resp[0];
        }
      })
      
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

  /**
   * Converts the given number to the role name as a string
   */
  determinRole(num: number): string {
    switch (num) {
      case 0:
        return 'Scrum Master';
      case 1:
        return 'Product Owner';
      case 2:
        return 'Developer';
      default:
        return '';
    }
  }
/**
 * Checks if the active user role is allowed to access an element
 * @param roles Allowed user roles as an array of strings. 
 * @returns 'true' if the user's role is allowed access, 'false' if not
 */
  allowedFor(roles: string[]) {
    let allowed = roles.find(element => {
      return element === this.determinRole(this.activeUser.role);
    });
    if (allowed) {
      return true;
    }
    return false;
  }
}
