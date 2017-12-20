import { Component, OnInit, Input } from '@angular/core';
import { BacklogItem } from '../../model/backlogItem';
import { BacklogService } from '../../service';

@Component({
  selector: 'app-bli-card',
  templateUrl: './bli-card.component.html',
  styleUrls: ['./bli-card.component.css']
})
export class BliCardComponent implements OnInit {
  context: string;
  //@Input() 
  item: BacklogItem;
  estimationValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  constructor(public backlogService: BacklogService) { }
  ngOnInit() {
  }
}
