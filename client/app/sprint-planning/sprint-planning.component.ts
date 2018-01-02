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
  fakeDate: string;
  sprintMinDate: string;
  backlogItems: BacklogItem[] = [];
  backlogItemsForSprint: BacklogItem[] = [];
  backlogItemsForSprintLoading: boolean = true;
  sprints: Sprint[] = [];
  selectedSprint: Sprint = {
    start: '',
    end: '',
    sprintNo: 0,
    backlogItems: []
  };

  newSprint: Sprint = {
    start: '',
    end: '',
    sprintNo: 0,
    backlogItems: []
  };
  constructor(
    public backlogService: BacklogService,
    public sprintService: SprintService,
    public projectService: ProjectService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getBacklogItems();
    this.getSprints();
  }

  //TODO Switch back to RFS
  getBacklogItems() {
    this.backlogService.getAll({ status: 'RFE' }).subscribe(result => {
      this.backlogItems = result;
    });
  }

  getSprints() {
    this.sprintService.getAll().subscribe(result => {
      if (result.length > 0) {
        this.sprints = result;
        this.selectedSprint = result[0];
        this.getSprintItems();
      }
    });
  }

  getSprintItems() {
    this.backlogItemsForSprintLoading = true;
    this.backlogService
      .getAll({ _id: { $in: this.selectedSprint.backlogItems } })
      .subscribe(result => {
        this.backlogItemsForSprint = result;
        this.backlogItemsForSprintLoading = false;
        console.log(result);
      });
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

  setFakeDate() {
    Date.prototype.getTime = function() {
      return moment(this.fakeTime).unix();
    };
  }

  getDate() {
    Date.prototype.getTime();
  }
  saveSprint() {
    if (this.getLatestSprint()) {
      this.newSprint.sprintNo = this.getLatestSprint().sprintNo + 1;
    }
    this.sprintService.add(this.newSprint).subscribe(() => {
      this.getSprints();
      this.modal.close();
    });
  }

  getLatestSprint() {
    if (this.sprints.length > 0) return this.sprints[this.sprints.length - 1];
  }

  saveBliToSprint() {
    this.backlogItemsForSprint.forEach(item => {
      //no array entry yet
      if (!this.selectedSprint.backlogItems) {
        this.selectedSprint.backlogItems = new Array();
      }
      this.selectedSprint.backlogItems.push(item._id);
    });
    this.sprintService
      .edit(this.selectedSprint._id, this.selectedSprint)
      .subscribe(() => {
        console.log('bli updated');
      });
  }

  allowDropFunction() {
    () => {
      return true;
    };
  }

  addToSprint($event: any) {
    //undefined, no bli's yet
    if (!this.sprints[0].backlogItems) {
      this.sprints[0].backlogItems = [];
    }
    //  this.sprints[0].backlogItem.push(this.backlogItems[$event.dragData])
    //this.backlogItems.splice($event.dragData,1)
  }

  setSelectedSprint(sprint: Sprint) {
    console.log('www');
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
