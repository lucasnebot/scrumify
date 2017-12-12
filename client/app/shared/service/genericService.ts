import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// Export
export { HttpClient } from '@angular/common/http';

export abstract class GenericService<T> {
    private BASE_URL: string = environment.api_uri;

    constructor(protected http: HttpClient, protected actionUrl: string) {}

    getAll(): Observable<T[]> {
      return this.http.get(this.BASE_URL + this.actionUrl).map(resp => resp as T[]);
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
  }


