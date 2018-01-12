import { Component, OnInit } from '@angular/core';
import { BacklogItem, Vote } from '../shared/model/backlogItem';
import { BacklogService, EstimationHelperService, ProjectService } from '../shared/service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-effort-estimation',
  templateUrl: './effort-estimation.component.html',
  styleUrls: ['./effort-estimation.component.css']
})
export class EffortEstimationComponent implements OnInit {
  blisToEstimate: BacklogItem[];
  constructor(public backlogService: BacklogService, public estHelper: EstimationHelperService, public projectService: ProjectService) {}

  ngOnInit() {
    // Gets all BLIs
    this.backlogService
      .getAll({ status: { $in: ['RFE', 'REEST']}, project: this.projectService.project._id })
      .subscribe(docs => {
        this.blisToEstimate = docs;
        this.estHelper.reestimationNeeded = docs.some(
          element => element.status === 'REEST'
        );
      });
  }
}
