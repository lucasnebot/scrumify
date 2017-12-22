import { Injectable } from '@angular/core';
import { Sprint } from '../model';
import {GenericService, HttpClient} from './generic.service';


@Injectable()
export class SprintService extends GenericService<Sprint>{
  constructor(http: HttpClient) {
    super(http, '/sprint');
  }

}
