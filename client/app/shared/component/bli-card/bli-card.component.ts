import { Component, OnInit, Input } from '@angular/core';
import { BacklogItem } from '../../model/backlogItem';
import { BacklogService, AuthService, ProjectService } from '../../service';
import { allResolved } from 'q';

@Component({
  selector: 'app-bli-card',
  templateUrl: './bli-card.component.html',
  styleUrls: ['./bli-card.component.css']
})
export class BliCardComponent implements OnInit {
  @Input() context: string;
  @Input() item: BacklogItem;
  alreadyVoted = false;
  voteCompleted = false;
  estimation = 0;
  estimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  constructor(
    protected backlogService: BacklogService,
    public authService: AuthService,
    public projectService: ProjectService
  ) {}
  ngOnInit() {
    this.alreadyVoted = this.backlogService.hasAlreadyVotedOn(this.item);
  }

  vote() {
    this.backlogService
      .voteOn(this.item, this.estimation)
      .subscribe(resp => {
        console.log(resp);
        this.item = resp;
        this.alreadyVoted = true;
        //if this was the last vote
        if(this.item.status === 'RFS'){
          this.voteCompleted = true;
        }
      });
  }
}
