import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[];

  constructor(private backlogService: BacklogService) { 
  }

  ngOnInit() {
   this.backlogService.getAll().subscribe(data => {this.backlogItems = data;});
  }

  getData(){
    this.ngOnInit();
  }

}
