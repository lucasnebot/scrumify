import { Component, OnInit, Input } from '@angular/core';
import { BacklogItem } from '../../model/backlogItem';
import { BacklogService } from '../../service';
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
  estimation = 0;
  estimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  constructor(public backlogService: BacklogService) { }
  ngOnInit() {
    this.alreadyVoted = this.backlogService.hasAlreadyVotedOn(this.item);
  }

  vote(){
    this.backlogService.voteOn(this.item._id,this.estimation).subscribe((resp) => {
      this.item = resp;
      this.alreadyVoted = true;
    });
  }

}
