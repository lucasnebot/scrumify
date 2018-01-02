import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

  constructor(private backlogService: BacklogService) { }
  backlogItems: BacklogItem[];

  ngOnInit() {
    this.backlogService.getAll({ status: 'SPRINT' }).subscribe(result => {
      this.backlogItems = result;
    });
  }

}
