import { Injectable } from '@angular/core';
import { Milestone } from '../model';
import {GenericService, HttpClient} from './genericService';


@Injectable()
export class MilestoneService extends GenericService<Milestone>{
  constructor(http: HttpClient) {
    super(http, '/milestone');
  }

}
