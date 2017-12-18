import { Injectable } from '@angular/core';
import { Project } from '../model';
import {GenericService, HttpClient} from './generic.service';


@Injectable()
export class ProjectService extends GenericService<Project>{
  project: Project;

  // Fetches the current project once on construction
  constructor(http: HttpClient) {
    super(http, '/project');
    this.fetchProject();
  }
    fetchProject(){
      this.getAll().subscribe((resp) => {
        if(resp.length >= 1) {
          this.project = resp[0];
        } else {
          this.project = null;
        }
      })
    }

}