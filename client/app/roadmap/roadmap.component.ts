import { Component, OnInit } from '@angular/core';
import Milestone from '../shared/model/milestone';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {
  formHidden = true;
  milestones: Milestone[] = [];
  milestone: Milestone = {
    title: '',
    description: '',
    date: ''
  };

  constructor() {}

  ngOnInit() {}

  toggleForm(): void {
    if (!this.formHidden) {
      this.addMilestone();
      // Clear Form and hide it
      this.milestone.title = '';
      this.milestone.description = '';
      this.milestone.date = '';
    }
    this.formHidden = !this.formHidden;
  }

  addMilestone(): void {
    this.milestones.push({
      title: this.milestone.title,
      description: this.milestone.description,
      date: this.milestone.date,
      achieved: false
    });
  }
}
