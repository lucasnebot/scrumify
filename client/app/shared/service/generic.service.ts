import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// Export
export { HttpClient } from '@angular/common/http';

export abstract class GenericService<T> {
    private BASE_URL: string = environment.api_uri;
  
    constructor(protected http: HttpClient, protected actionUrl: string) {}
    //! Add mongodb operators (less than etc), try to get bodyparser/middleware to work
    getAll(filterBy?: [string,string][]) : Observable<T[]> {      
      let params = new HttpParams();
      if(filterBy){
        filterBy.forEach((element) => {
          params = params.set(element[0], element[1]);
        })
      }
      return this.http.get(this.BASE_URL + this.actionUrl,{params: params}).map(resp => resp as T[]);              
    }
    // Changed id type to string and fix url
    getOne(id: string): Observable<T> {
      return this.http.get(this.BASE_URL + `${this.actionUrl}/${id}`).map(resp => resp as T);
    }
    add(document: T): Observable<any> {
      return this.http.post(this.BASE_URL + this.actionUrl, document);
    }
    delete(id: string): Observable<any> {
      return this.http.delete(this.BASE_URL + `${this.actionUrl}/${id}`);
    }
    edit(id: string, update: Object): Observable<T> {
      return this.http.put(this.BASE_URL + `${this.actionUrl}/${id}`, update).map(resp => resp as T);
    }
    editAll(update: Object[]): Observable<T> {
      return this.http.put(this.BASE_URL + `${this.actionUrl}`, update);
    }
  }


