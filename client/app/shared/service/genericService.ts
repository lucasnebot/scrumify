import { Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
// Export
export {HttpClient} from '@angular/common/http';


export abstract class GenericService<T> {
  //* Local: "http://localhost:3000/api" | Web: "https://scrumify.herokuapp.com/api"
  BASE_URL = "https://scrumify.herokuapp.com/api";
  
    constructor(protected http: HttpClient, protected actionUrl:string){
    }
  
    getAll():Observable<T[]> {
      return this.http.get(this.BASE_URL + this.actionUrl).map(resp => resp as T[]);
    }
    // Changed id type to string and fix url
    getOne(id:string):Observable<T> {
      return this.http.get(this.BASE_URL + `${this.actionUrl}/${id}`).map(resp => resp as T);
    }
    add(document: T): Observable<any>{
      return this.http.post(this.BASE_URL + this.actionUrl, document);
    }
    delete(id: string): Observable<any>{
      return this.http.delete(this.BASE_URL + `${this.actionUrl}/${id}`);
    }
    edit(id: string, update: Object):Observable<T>{
      return this.http.put(this.BASE_URL + `${this.actionUrl}/${id}`, update).map(resp => resp as T);
    }
  }


