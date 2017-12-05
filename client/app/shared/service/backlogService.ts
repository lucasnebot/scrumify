import { BacklogItem } from './../model/.';
import {genericService} from './genericService';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class backlogService extends genericService<BacklogItem>{
    constructor(http: HttpClient){
        console.log("here");
        super(http,"/backlog");  
    }
}