import { Component, OnInit, Input } from '@angular/core';
import { BacklogItem, Vote } from '../../model/backlogItem';
import {
  BacklogService,
  AuthService,
  ProjectService,
  EstimationHelperService
} from '../../service';

@Component({
  selector: 'app-bli-card',
  templateUrl: './bli-card.component.html',
  styleUrls: ['./bli-card.component.css']
})
export class BliCardComponent implements OnInit {
  @Input() context: string;
  @Input() item: BacklogItem;
  // Properties for planning poker
  alreadyVoted = false;
  estimation = 0;
  estimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  constructor(
    protected backlogService: BacklogService,
    public authService: AuthService,
    public projectService: ProjectService,
    public estHelper: EstimationHelperService
  ) {}
  ngOnInit() {
    // TODO : Just for context 'EffortEstimationComponent'
    switch (this.item.status) {
      case 'REEST':
        this.alreadyVoted = false;
        this.sliceEstimationValueRange();

        this.estHelper.reestimationNeeded = true;
        break;
      case 'RFE':
        this.alreadyVoted = this.item.voted.some(
          v => v.voterEmail === this.authService.activeUser.email
        );
        break;
      case 'RFS': {
        this.alreadyVoted = true;
      }
    }
  }

  vote() {
    // Build new vote
    const vote: Vote = {
      voterName: this.authService.activeUser.name,
      voterEmail: this.authService.activeUser.email,
      estimation: this.estimation
    };
    if (this.item.status === 'RFE') {
      this.item.voted.push(vote);
    } else if (this.item.status === 'REEST') {
      // Update own vote
      let ownVoteIndex = this.item.voted.findIndex(
        e => e.voterEmail === this.authService.activeUser.email
      );
      this.item.voted[ownVoteIndex].estimation = this.estimation;
    }
    // Has everbody voted?
    if (this.item.voted.length === this.projectService.numberOfDevelopers) {
      // Estimation range acceptable?
      if (this.estHelper.estimationRangeAcceptable(this.item)) {
        const median = this.estHelper.getEstimationMedian(this.item);
        this.handleVoteUpdate({
          voted: this.item.voted,
          estimation: median,
          status: 'RFS'
        });
        // ---- Estimation finished
      } else {
        this.handleVoteUpdate({
          voted: this.item.voted,
          status: 'REEST'
        });
        // ---- Reestimation needed
      }
    } else {
      this.handleVoteUpdate({ $push: { voted: vote } });
      // ---- Vote submitted
    }
  }

  sliceEstimationValueRange() {
    let indexLow: number;
    let indexHigh: number;
    // shorten the value range
    this.estHelper.orderVotesByEstimation(this.item);
    indexLow = this.estimationValues.findIndex(
      element => element === Number(this.item.voted[0].estimation)
    );
    indexHigh = this.estimationValues.findIndex(
      element =>
        element === Number(this.item.voted[this.item.voted.length - 1].estimation)
    );
    this.estimationValues = this.estimationValues.slice(
      indexLow,
      indexHigh + 1
    );
  }
  handleVoteUpdate(updateObject: any) {
    this.backlogService
      .edit(this.item._id, updateObject, true)
      .subscribe(resp => {
        this.item = resp;
        this.ngOnInit();
      });
  }
}
