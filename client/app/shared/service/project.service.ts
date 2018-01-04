import { Injectable } from '@angular/core';
import { Project } from '../model';
import { GenericService, HttpClient } from './generic.service';
import { UserService } from './user.service';

@Injectable()
export class ProjectService extends GenericService<Project> {
  project: Project;
  numberOfDevelopers: number;

  // Fetches the current project once on construction
  constructor(http: HttpClient, private userService: UserService) {
    super(http, '/project');
    this.fetchProject();
  }
  // TODO change to multi project
  /**
   * Retrieves the project with all of its data and saves it into the singleton project service
   */
  fetchProject() {
    this.getAll().subscribe(resp => {
      if (resp.length >= 1) {
        // TODO
        this.project = resp[0];
        this.getNumberOfDevelopers();
      } else {
        this.project = null;
      }
    });
  }
  /**
   * Adds the given id to the user field of the active project in the db
   * @param userId 
   */
  addProjectMember(userId: string) {
   this.edit(
      this.project._id,
      {
        $push: { users: userId }
      },
      true
    ).subscribe(() => {
      console.log('Project Member added');
    });
  }
  /**
   * Saves the number of developers in the given project into the project singleton service
   */
  getNumberOfDevelopers() {
    this.userService.getAll({_id: {$in: this.project.users}, role: 2}).subscribe((resp) => {
      this.numberOfDevelopers = resp.length;
    })
  }
}
