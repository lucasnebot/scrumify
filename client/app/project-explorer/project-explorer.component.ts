import { Component, OnInit } from '@angular/core';
import {
  ProjectService,
  AuthService,
  UserService,
  LS_PROJECT
} from '../shared/service';
import { Project, User } from '../shared/model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-project-explorer',
  templateUrl: './project-explorer.component.html',
  styleUrls: ['./project-explorer.component.css']
})
export class ProjectExplorerComponent implements OnInit {
  projects: Project[] = [];
  newProject = new Project();
  userDataAlreadyLoaded: boolean;
  projectForm = {
    userNames: '',
    users: [] as User[],
    usersToBeAdded: [] as User[],
    teamValid: true,
    teamSelectionVisible: false,
    activeTab: 'Info'
  };

  constructor(
    protected projectService: ProjectService,
    public authService: AuthService,
    protected router: Router,
    protected userService: UserService
  ) {}

  ngOnInit() {
    if (this.authService.activeUser.projects) {
      this.userDataAlreadyLoaded = true;
      this.displayUserProjects();
    } else {
      this.userDataAlreadyLoaded = false;
    }
  }

  selectProject(project: Project) {
    this.projectService.project = project;
    // Add project to localstorage
    localStorage.setItem(LS_PROJECT, JSON.stringify(project));
    //! Used for effort estimation | TODO: change location?
    this.projectService.getNumberOfDevelopers();
    this.router.navigate(['/']);
  }
  displayUserProjects() {
    this.projectService
      .getUserProjects(this.authService.activeUser.projects)
      .subscribe(resp => {
        this.userDataAlreadyLoaded = true;
        this.projects = resp;
      });
  }
  createProject() {
    if (!this.validateTeam()) {
      return (this.projectForm.teamValid = false);
    }
    this.projectService
      .add(this.newProject)
      .mergeMap(projectResp => {
        // Display project
        this.projects.push(projectResp);
        // Update User on client
        this.authService.activeUser.projects.push(projectResp._id);
        // Generate array with all team ids including the po's
        let teamIds: string[] = [];
        this.projectForm.usersToBeAdded.forEach((elem: User) => {
          teamIds.push(elem._id);
        });
        teamIds.push(this.authService.activeUser._id);
        // UpdateMany
        return this.userService.editMany(
          { _id: { $in: teamIds } },
          { $push: { projects: projectResp._id } }
        );
      })
      .subscribe(userResp => {
        // Clear form
        this.newProject = new Project();
        this.projectForm.usersToBeAdded = [];
        this.projectForm.users = [];
        this.projectForm.teamValid = true;
      });
  }

  isProjectSelected(project: Project): boolean {
    if (this.projectService.project) {
      return project._id === this.projectService.project._id;
    }
    return false;
  }

  openTeamTab() {
    if (
      !this.projectForm.teamSelectionVisible &&
      this.projectForm.users.length === 0 &&
      this.projectForm.usersToBeAdded.length === 0
    ) {
      // Returns all users from the db
      this.userService.getAll({ role: { $ne: 1 } }).subscribe(resp => {
        this.projectForm.users = resp;
        //this.projectForm.teamSelectionVisible = !this.projectForm.teamSelectionVisible;
        this.projectForm.activeTab = 'Team';
      });
    } else {
      this.projectForm.activeTab = 'Team';
      //this.projectForm.teamSelectionVisible = !this.projectForm.teamSelectionVisible;
    }
  }
  switchUser(user: User, from: User[], to: User[]) {
    to.push(user);
    from.splice(from.indexOf(user), 1);
    this.projectForm.teamValid = true;
  }
  validateTeam(): boolean {
    let developers = 0;
    let scrumMaster = 0;
    this.projectForm.usersToBeAdded.forEach((user: User) => {
      if (user.role === 0) {
        scrumMaster++;
      } else if (user.role === 2) {
        developers++;
      }
    });
    if (developers >= 3 && scrumMaster === 1) {
      return true;
    }
    return false;
  }
}
