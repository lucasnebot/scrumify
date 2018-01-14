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
    private projectService: ProjectService
  ) {}
  backlogItems: BacklogItem[] = [];
  taskStates: string[] = ['Todo', 'Doing', 'Review', 'Done'];
  developers: User[] = [];
  ngOnInit() {
    this.backlogService.getAll({ status: 'SPRINT' }).subscribe(result => {
      this.backlogItems = result;
    });

    this.userService.getAll({ role: 2 , projects: this.projectService.project._id}).subscribe(result => {
      this.developers = result;
    });
  }
}
