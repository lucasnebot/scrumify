import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from './../shared/service/project.service';
import { BacklogItem, Sprint } from './../shared/model/.';
import { BacklogService, SprintService } from './../shared/service/.';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.css']
})
export class SprintPlanningComponent implements OnInit {
  modal;
  enableEditing: boolean = true;
  progressBarValue: number = 0;
  progressbarLabel: string;
  currentStoryPointUsage: number;
  sprintMinDate: string;
  backlogItems: BacklogItem[] = [];
  backlogItemsForSprint: BacklogItem[] = [];
  sprints: Sprint[] = [];
  selectedSprint: Sprint = {
    start: '',
    end: '',
    sprintNo: 0,
    backlogItems: [],
    project: null
  };

  newSprint: Sprint;
  constructor(
    public projectService: ProjectService,
    public backlogService: BacklogService,
    public sprintService: SprintService,
    private modalService: NgbModal
  ) {
    this.newSprint =  {
      start: '',
      end: '',
      sprintNo: 0,
      backlogItems: [],
      project: this.projectService.project._id
    };
  }

  ngOnInit() {
    this.getBacklogItems();
    this.getSprints();
  }

  getBacklogItems() {
    this.backlogService.getAll({ status: 'RFE' }).subscribe(result => {
      this.backlogItems = result;
    });
  }

  getSprints() {
    console.log('get sprints called !')
    this.sprintService.getAll().subscribe(result => {
      if (result.length > 0) {
        this.sprints = result;
        this.getSprintItems();
      }
    });
  }

  getSprintItems() {
    this.enableEditing = true;
    console.log(this.selectedSprint);
    //if bli are present
    if (this.selectedSprint && this.selectedSprint.backlogItems.length > 0) {
      //sprint has already been planned
      this.enableEditing = false;
      //get bli's for current selected sprint
      this.backlogService
        .getAll({ _id: { $in: this.selectedSprint.backlogItems } })
        .subscribe(result => {
          if (result.length > 0) {
            this.enableEditing = false;
          }
          this.backlogItemsForSprint = result;
        });
    } else {
      this.backlogItemsForSprint = [];
    }
  }

  getTotalStoryPointUsage(): number {
    let usage = 0;
    if (this.backlogItemsForSprint) {
      this.backlogItemsForSprint.forEach(item => {
        usage += item.estimation;
      });
    }
    return usage;
  }

  sprintTooFull() {
    if (
      this.getTotalStoryPointUsage() >
      this.projectService.project.storyPointsPerSprint
    ) {
      return true;
    } else {
      return false;
    }
  }

  disableInteraction(): boolean {
    return this.backlogItemsForSprint.length > 0;
  }

  /**
   * If inital is not set, a sprint is added to existing sprint list. Therefore a min property is bound to the datepicker.
   */
  open(content, initial?) {
    if (!initial) {
      let minDate = moment(this.getLatestSprint().end).format('YYYY-MM-DD');
      this.sprintMinDate = minDate;
      this.newSprint.start = minDate;
      this.calcEndDate();
    } else {
      this.sprintMinDate = moment().format('YYYY-MM-DD');
    }
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => {}, reason => {});
  }

  saveSprint() {
    console.log(this.newSprint.project);
    if (this.getLatestSprint()) {
      this.newSprint.sprintNo = this.getLatestSprint().sprintNo + 1;
    }
    this.sprintService.add(this.newSprint).subscribe(() => {
      this.getSprints();
      this.modal.close();
      this.setSelectedSprint(this.getLatestSprint());
    });
  }

  getLatestSprint() {
    if (this.sprints.length > 0) return this.sprints[this.sprints.length - 1];
  }

  saveBliToSprint() {
    this.enableEditing = false;
    this.backlogItemsForSprint.forEach(item => {
      //no array entry yet
      if (!this.selectedSprint.backlogItems) {
        this.selectedSprint.backlogItems = new Array();
      }
      this.selectedSprint.backlogItems.push(item._id);
    });

    this.sprintService
      //Write Bli's to Sprint
      .edit(this.selectedSprint._id, this.selectedSprint)
      .subscribe(() => {
        //Change Status to SPRINT
        this.backlogService
          .editMany(
            { _id: { $in: this.selectedSprint.backlogItems } },
            { $set: { status: 'SPRINT' } }
          )
          .subscribe(result => {});
      });
  }

  allowDropFunction() {
    () => {
      return true;
    };
  }

  setSelectedSprint(sprint: Sprint) {
    this.selectedSprint = sprint;
    this.getSprintItems();
  }

  calcEndDate() {
    let sprintDuration = this.projectService.project.sprintDuration;
    this.newSprint.end = moment(this.newSprint.start)
      .add(sprintDuration, 'days')
      .format('YYYY-MM-DD');
    //this.projectService.project.sprintDuration
  }
}
