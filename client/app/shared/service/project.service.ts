import { Injectable } from '@angular/core';
import { Project } from '../model';
import { GenericService, HttpClient } from './generic.service';
import { UserService } from './user.service';
import * as moment from 'moment';
import { Sprint } from '../model/sprint';

export const LS_PROJECT = 'scrumifyProject';

@Injectable()
export class ProjectService extends GenericService<Project> {
  project: Project;
  numberOfDevelopers: number;

  // Fetches the current project once on construction
  constructor(
    http: HttpClient,
    private userService: UserService
  ) {
    super(http, '/project');
    //! If project in local storage, then load it
    let jsonProject = localStorage.getItem(LS_PROJECT);
    if(jsonProject){
      this.project = JSON.parse(jsonProject);
      this.getNumberOfDevelopers();
    }
  }

  /**
   * Returns Observable sequence with all the projects a user takes part in
   * @param ids Array of project IDs
   */
  getUserProjects(ids: string[]) {
    return this.getAll({ _id: { $in: ids } });
  }

  /**
   * Saves the number of developers in the given project into the project singleton service
   */
  getNumberOfDevelopers() {
    this.userService
      .getAll({ projects: this.project._id, role: 2 })
      .subscribe(resp => {
        this.numberOfDevelopers = resp.length;
      });
  }

  /**
   * Set active sprint
   * @param sprint
   */
  setActiveSprint(sprint: Sprint) {
    // Set sprint as active sprint if date fits
    if ( moment(Date.now()).isBetween(sprint.start, sprint.end)) {
      const currentProject = this.project;
      currentProject.activeSprint = sprint._id;
      console.log('Active Sprint: ' + JSON.stringify(currentProject.activeSprint));
      this.edit(currentProject._id, currentProject).subscribe(project => {
        this.project = project;
      });
    }
  }
}
