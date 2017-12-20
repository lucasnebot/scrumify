import { Component, OnInit } from '@angular/core';
import { BacklogItem, Vote } from '../shared/model';
import { BacklogService, AuthService } from '../shared/service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-effort-estimation',
  templateUrl: './effort-estimation.component.html',
  styleUrls: ['./effort-estimation.component.css']
})
export class EffortEstimationComponent implements OnInit {
  blisToEstimate: BacklogItem[];
  votes: Vote[] = [];
  estimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  constructor(public backlogService: BacklogService, private authService: AuthService) {}

  ngOnInit() {
    this.backlogService.getAll({ status: 'RFE'}).subscribe(docs => {
      this.blisToEstimate = docs;
      this.createVoteTemplates();
      console.log(this.votes);
    });
  }
  // TODO delete
  createVoteTemplates(){
    const emptyUserVote: Vote = {
      voterEmail: this.authService.activeUser.email,
      estimation: 0
    }
    for(let i = 0; i < this.blisToEstimate.length; i++){
      this.votes.push(emptyUserVote);
    }
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
