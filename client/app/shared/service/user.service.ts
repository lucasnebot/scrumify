import { Injectable } from '@angular/core';
import {GenericService} from './genericService';
import {User} from '../model';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class UserService extends GenericService<User>{
  constructor(http: HttpClient) {
    super(http,"/user");  
   }
   signUp(user: User): Observable<any>{
    return this.http.post("https://scrumify.herokuapp.com/signUp", user);
  }
}
