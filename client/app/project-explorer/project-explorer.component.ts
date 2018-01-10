import { Component, OnInit } from '@angular/core';
import { ProjectService, AuthService, UserService } from '../shared/service';
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
    usersToBeAdded: [],
    teamValid: true
  };

  constructor(
    protected projectService: ProjectService,
    protected authService: AuthService,
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
    if(!this.validateTeam()) {
      return this.projectForm.teamValid = false;
    }
    this.projectService
      .add(this.newProject)
      // TODO edit projectId on all Users
      .mergeMap(projectResp => {
        // Display project
        this.projects.push(projectResp);
        // Update User on client
        this.authService.activeUser.projects.push(projectResp._id);
        // Generate array with all team ids including the po's
        let teamIds: string[] = [];
        this.projectForm.usersToBeAdded.forEach((elem: User) => {
          teamIds.push(elem._id);
        })
        teamIds.push(this.authService.activeUser._id);
        // UpdateMany
        return this.userService.editMany(
          {_id : {$in: teamIds}},
          { $push: { projects: projectResp._id } }
        );
      })
      .subscribe(userResp => {
        // Clear form
        this.newProject = new Project();
        this.projectForm.usersToBeAdded = [];
        this.projectForm.teamValid = true;
      });
  }

  isProjectSelected(project: Project): boolean {
    if (this.projectService.project) {
      return project._id === this.projectService.project._id;
    }
    return false;
  }
  // TODO only one Scrum Master per Team
  findUsers(){
    let namesArray: string[] = this.projectForm.userNames.trim().split(',');
    this.userService.getAll({name: {$in: namesArray}, role: {$ne: 1}}).subscribe((resp) => {

    resp.forEach((respElem) => {
      // TODO : extract?
      let userInluded = this.projectForm.usersToBeAdded.find((e) => {
        return e.email === respElem.email
      }); 
      if(!userInluded){
        this.projectForm.usersToBeAdded.push(respElem);
      }
    })
     this.projectForm.userNames = '';
    })
  }

  removeFromToBeAdded(user: User){
    this.projectForm.usersToBeAdded =  this.projectForm.usersToBeAdded.filter((e) => {
      return e.email !== user.email
    });
  }
  validateTeam(): boolean{
    let developers = 0;
    let scrumMaster = 0;
    this.projectForm.usersToBeAdded.forEach((user: User) => {
      if (user.role === 0) {
        scrumMaster++;
      } else if (user.role === 2){
        developers++
      }
    })
    console.log(developers,scrumMaster);
    if(developers >= 3 && scrumMaster === 1){
      return true;
    }
    return false;
  }
}
