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
  fetchProject() {
    this.getAll().subscribe(resp => {
      if (resp.length >= 1) {
        this.project = resp[0];
        this.getNumberOfDevelopers();
      } else {
        this.project = null;
      }
    });
  }
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
  // TODO : Extract a getProjectMembers() method
  getNumberOfDevelopers() {
    this.userService.getAll({_id: {$in: this.project.users}, role: 2}).subscribe((resp) => {
      this.numberOfDevelopers = resp.length;
    })
  }
}
