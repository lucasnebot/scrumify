import { Component, OnInit } from '@angular/core';
import { Milestone } from '../shared/model';
import {
  MilestoneService,
  AuthService,
  ProjectService
} from '../shared/service';

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
    date: '',
    project: this.projectService.project._id
  };

  constructor(
    private milestoneService: MilestoneService,
    public authService: AuthService,
    protected projectService: ProjectService
  ) {}

  ngOnInit() {
    this.milestoneService.getAll({project: this.projectService.project._id}).subscribe(docs => {
      this.milestones = docs;
      this.sortMilestones();
    });
  }

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
    let milestone: Milestone = {
      title: this.milestone.title,
      description: this.milestone.description,
      date: this.milestone.date,
      project: this.milestone.project
    };
    this.milestoneService.add(milestone).subscribe(resp => {
      this.ngOnInit();
    });
  }

  deleteMilestone(id: string): void {
    this.milestoneService.delete(id).subscribe(resp => {
      this.ngOnInit();
    });
  }

  achieveMilestone(id: string): void {
    let update = { achieved: true };
    this.milestoneService.edit(id, update).subscribe(resp => {
      this.ngOnInit();
    });
  }

  sortMilestones() {
    this.milestones.sort((a: Milestone, b: Milestone): number => {
      return Date.parse(a.date) - Date.parse(b.date);
    });
  }
}
