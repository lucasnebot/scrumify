import { Injectable } from '@angular/core';
import { Milestone } from '../model';
import {GenericService, HttpClient} from './generic.service';


@Injectable()
export class MilestoneService extends GenericService<Milestone>{
  constructor(http: HttpClient) {
    super(http, '/milestone');
  }

}
