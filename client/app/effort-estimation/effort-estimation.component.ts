import { Component, OnInit } from '@angular/core';
import { BacklogItem, Vote } from '../shared/model/backlogItem';
import { BacklogService, AuthService } from '../shared/service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-effort-estimation',
  templateUrl: './effort-estimation.component.html',
  styleUrls: ['./effort-estimation.component.css']
})
export class EffortEstimationComponent implements OnInit {
  blisToEstimate: BacklogItem[];
  constructor(public backlogService: BacklogService, private authService: AuthService) {}

  ngOnInit() {
    this.backlogService.getAll({ status: 'RFE'}).subscribe(docs => {
      this.blisToEstimate = docs;
      console.log(this.constructor.name);
    });
  }
  // could be extracted to backlog.service
  /**
   * Adds a vote object with the estimation 
   * @param id 
   * @param estimation 
   */
  voteOn(id: string, estimation: number) {
    const vote: Vote = {
      voterEmail: this.authService.activeUser.email,
      estimation: estimation
    };
    this.backlogService.edit(
      id,
      {
        $push: { voted: vote }
      },
      true
    ).subscribe((resp) => {
      this.ngOnInit();
    });
  }

}
