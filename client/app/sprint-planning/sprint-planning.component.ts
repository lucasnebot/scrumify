import { BacklogItem, Sprint} from './../shared/model/.';
import { BacklogService, SprintService } from './../shared/service/.';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.css']
})
export class SprintPlanningComponent implements OnInit {
  backlogItems: BacklogItem[] = [];
  sprints: Sprint[] = [];
  newSprint: Sprint = {
    start: new Date(),
    end: new Date('Yersterday'),
    sprintNo: 0,
    backlogItem: []
  }
  constructor(private backlogService : BacklogService,
              private sprintService: SprintService) { }

  ngOnInit() {
    this.getBacklogItems();
    this.getSprints();
  }

  //TODO Switch back to RFS 
  getBacklogItems(){
    this.backlogService.getAll({status: 'RFE'}).subscribe((result) => {
      this.backlogItems = result;
    })
  }

  getSprints(){
    this.sprintService.getAll().subscribe((result) => {
      this.sprints = result;
    })
  }

  saveSprint(){
    
  }

}
