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
  constructor(public backlogService: BacklogService) {}

  ngOnInit() {
    this.backlogService.getAll({ status: 'RFE'}).subscribe(docs => {
      this.blisToEstimate = docs;
    });
  }
}
