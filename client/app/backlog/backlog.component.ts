import { backlogService } from './../shared/service/backlogService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogService: backlogService;

  constructor(backlogService: backlogService) { 
    this.backlogService = backlogService;
  }

  ngOnInit() {
  }

  getData(){
    console.log("Get Data called");
    this.backlogService.getAll().subscribe(data => data);    
  }

}
