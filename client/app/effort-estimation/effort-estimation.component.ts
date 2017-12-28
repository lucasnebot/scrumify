import { Component, OnInit } from '@angular/core';
import { BacklogItem, Vote } from '../shared/model/backlogItem';
import { BacklogService } from '../shared/service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-effort-estimation',
  templateUrl: './effort-estimation.component.html',
  styleUrls: ['./effort-estimation.component.css']
})
export class EffortEstimationComponent implements OnInit {
  blisToEstimate: BacklogItem[];
  blisToReestimate: BacklogItem[];
  constructor(public backlogService: BacklogService) {}

  ngOnInit() {
    // Gets 
    this.backlogService.getAll({ status: {$in: ['RFE', 'REEST']}}).subscribe(docs => {
      this.blisToEstimate = docs.filter(element => element.status === 'RFE');
      console.log(this.blisToEstimate);
      this.blisToReestimate = docs.filter(element => element.status === 'REEST');
      console.log(this.blisToReestimate);

    });
  }
}
