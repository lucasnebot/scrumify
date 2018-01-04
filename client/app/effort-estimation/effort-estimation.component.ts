import { Component, OnInit } from '@angular/core';
import { BacklogItem, Vote } from '../shared/model/backlogItem';
import { BacklogService, EstimationHelperService } from '../shared/service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-effort-estimation',
  templateUrl: './effort-estimation.component.html',
  styleUrls: ['./effort-estimation.component.css']
})
export class EffortEstimationComponent implements OnInit {
  blisToEstimate: BacklogItem[];
  constructor(public backlogService: BacklogService, public estHelper: EstimationHelperService) {}

  ngOnInit() {
    // Gets
    this.backlogService
      .getAll({ status: { $in: ['RFE', 'REEST'] } })
      .subscribe(docs => {
        this.blisToEstimate = docs;
        this.estHelper.reestimationNeeded = docs.some(
          element => element.status === 'REEST'
        );
      });
  }
}
