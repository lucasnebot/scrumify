import { Injectable } from '@angular/core';
import { Milestone } from '../model';
import {genericService, HttpClient} from './genericService';


@Injectable()
export class MilestoneService extends genericService<Milestone>{
  constructor(http: HttpClient) {
    super(http, '/milestone');
  }

}
