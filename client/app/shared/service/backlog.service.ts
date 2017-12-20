import { Observable } from 'rxjs/Observable';
import { BacklogItem } from './../model/.';
import {GenericService} from './generic.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class BacklogService extends GenericService<BacklogItem>{
    constructor(http: HttpClient){
        super(http,"/backlogItem");  
    }
    updateOrder(update: Object[]): Observable<any> {
        return this.http.put(this.BASE_URL + `${this.actionUrl}`, update);
      }
}