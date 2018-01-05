import { Injectable } from '@angular/core';
import { Task } from '../model';
import {GenericService, HttpClient} from './generic.service';


@Injectable()
export class TaskService extends GenericService<Task>{
  constructor(http: HttpClient) {
    super(http, '/task');
  }

}
