import { BacklogItem } from './../model/.';
import {GenericService} from './genericService';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class BacklogService extends GenericService<BacklogItem>{
    constructor(http: HttpClient){
        console.log("here");
        super(http,"/backlogItem");  
    }
}