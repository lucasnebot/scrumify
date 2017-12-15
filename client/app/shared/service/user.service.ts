import { Injectable } from '@angular/core';
import { GenericService } from './genericService';
import { User, SignInData } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(http: HttpClient) {
    super(http, '/user');
  }
  // Nearly equal to 'create user' therefore included here
  signUp(user: User): Observable<any> {
    return this.http.post( environment.normal_uri + '/signUp', user);
  }
}
