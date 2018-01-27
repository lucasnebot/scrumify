import { SprintService } from './../shared/service/sprint.service';
import { BacklogItem, User } from './../shared/model/';
import { BacklogService, UserService } from './../shared/service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/service/project.service';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {
  constructor(
    private backlogService: BacklogService,
    private userService: UserService,
    private projectService: ProjectService,
    private sprintService: SprintService
  ) {}
  backlogItems: BacklogItem[] = [];
  taskStates: string[] = ['Todo', 'Doing', 'Review', 'Done'];
  developers: User[] = [];
  sprintNo = 0;
  ngOnInit() {
    this.sprintService.getOne(localStorage.getItem('activeSprint')).subscribe(sprint =>{
      this.sprintNo = sprint.sprintNo;
      this.backlogService.getAll({_id: { $in: sprint.backlogItems }}).subscribe(blis =>{
        this.backlogItems = blis;
      });
    });

    this.userService.getAll({ role: 2 , projects: this.projectService.project._id}).subscribe(devs => {
      this.developers = devs;
    });
  }
}
