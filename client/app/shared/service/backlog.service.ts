import { BacklogItem } from './../model';
import {GenericService} from './generic.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class BacklogService extends GenericService<BacklogItem>{
    constructor(http: HttpClient){
        super(http,"/backlogItem");  
    }
}