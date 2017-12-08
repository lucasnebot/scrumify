import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
// Export
export {HttpClient, HttpResponse} from '@angular/common/http';

const BASE_URL = "http://localhost:3000/api";

export abstract class genericService<T> {
    constructor(protected http: HttpClient, protected actionUrl:string){
    }
  
    getAll():Observable<T[]> {
      return this.http.get(BASE_URL + this.actionUrl).map(resp => resp as T[]);
    }
    // Changed id type to string and fix url
    getOne(id:string):Observable<T> {
      return this.http.get(BASE_URL + `${this.actionUrl}/${id}`).map(resp => resp as T);
    }
    add(document: T): Observable<any>{
      return this.http.post(BASE_URL + this.actionUrl, document);
    }
    delete(id: string): Observable<any>{
      return this.http.delete(BASE_URL + `${this.actionUrl}/${id}`);
    }
    edit(id: string, update: object):Observable<T>{
      return this.http.put(BASE_URL + `${this.actionUrl}/${id}`, update).map(resp => resp as T);
    }
  }


