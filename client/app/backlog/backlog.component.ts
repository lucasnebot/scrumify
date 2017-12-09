import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  constructor(private backlogService: BacklogService) { 
  }

  ngOnInit() {
  }

  getData(){
    console.log("Get Data called");
    this.backlogService.getAll().subscribe(data => data);    
  }

}
