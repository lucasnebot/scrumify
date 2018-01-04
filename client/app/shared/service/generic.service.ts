import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// Export
export { HttpClient } from '@angular/common/http';

export abstract class GenericService<T> {
    protected BASE_URL: string = environment.api_uri;
  
    constructor(protected http: HttpClient, protected actionUrl: string) {}
    /**
     * 
     * @param queryOps optional query operators
     */
    getAll(queryOps?: Object) : Observable<T[]> {      
      let params = new HttpParams();
      if(queryOps){
          params = params.set('queryOps',JSON.stringify(queryOps) );
      }
      return this.http.get(this.BASE_URL + this.actionUrl,{params: params}).map(resp => resp as T[]);              
    }
    getOne(id: string): Observable<T> {
      return this.http.get(this.BASE_URL + `${this.actionUrl}/${id}`).map(resp => resp as T);
    }
    add(document: T): Observable<any> {
      return this.http.post(this.BASE_URL + this.actionUrl, document);
    }
    delete(id: string): Observable<any> {
      return this.http.delete(this.BASE_URL + `${this.actionUrl}/${id}`);
    }
    /**
     * 
     * @param advancedQuery If set 'true' an valid (more complex) mongoDB queryObject is expected
     */
    edit(id: string, update: Object, advancedQuery?: boolean): Observable<T> {
      let params = new HttpParams();
      if(advancedQuery){
        params = params.set('advancedQuery', 'true');
      }
      return this.http.put(this.BASE_URL + `${this.actionUrl}/${id}`, update,{params: params}).map(resp => resp as T);
    }
    editMany(condition: Object, query: Object):  Observable<T[]> {
      return this.http.put(this.BASE_URL + this.actionUrl,[condition,query]).map(resp => resp as T[]);              
    }
  }


