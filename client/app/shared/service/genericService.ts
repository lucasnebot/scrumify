import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = "/path/goes/here/api";

export abstract class genericService<T> {
    constructor(protected http: HttpClient, protected actionUrl:string){
    }
  
    getAll():Observable<T[]> {
      return this.http.get(BASE_URL + this.actionUrl).map(resp => resp as T[]);
    }
    getOne(id:number):Observable<T> {
      return this.http.get(BASE_URL + `${this.actionUrl}${id}`).map(resp => resp as T);
    }
    //TODO add delete edit 
  }


