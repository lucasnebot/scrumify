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
  enableEditing = true;
  progressBarValue = 0;
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
  constructor(public projectService: ProjectService, public backlogService: BacklogService, public sprintService: SprintService,
    private modalService: NgbModal) {
    this.newSprint = {
      start: moment().format('YYYY-MM-DD'),
      end: moment().add(this.projectService.project.sprintDuration, 'days').format('YYYY-MM-DD'),
      sprintNo: 0,
      backlogItems: [],
      project: this.projectService.project._id
    };
  }

  ngOnInit() {
    this.getSprints();
    this.getBacklogItems();
  }

  getSprints(setSelectedIndex?: number) {
    const activeProject = this.projectService.project;
    this.sprintService.getAll({ project: activeProject._id }).subscribe(result => {
      this.sprints = result;

      // Sort Sprints by end date asc
      this.sprints.sort((a, b) => {
        return +new Date(a.end) - +new Date(b.end);
      });

      // Select active Sprint as default
      if (activeProject.activeSprint) {
        this.selectedSprint = this.sprints.filter(sprint => {
          if (activeProject.activeSprint === sprint._id) {
            return sprint;
          }
        })[0];

        // Set default settings for new Sprint
        this.newSprint.sprintNo = this.getLatestSprint().sprintNo + 1;
        this.newSprint.start = moment(this.getLatestSprint().end).add(1, 'day').format('YYYY-MM-DD');
        this.newSprint.end = moment(this.getLatestSprint().end)
                            .add(this.projectService.project.sprintDuration + 1, 'day').format('YYYY-MM-DD');

        this.getSprintItems();
      }

      //
    });
  }

  getBacklogItems() {
    this.backlogService.getAll({ status: 'RFS', project: this.projectService.project._id }).subscribe(result => {
      this.backlogItems = result;
    });
  }

  getSprintItems() {
    this.enableEditing = true;
    // if bli are present
    if (this.selectedSprint && this.selectedSprint.backlogItems.length > 0) {
      // sprint has already been planned
      this.enableEditing = false;
      // get bli's for current selected sprint
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
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => { }, reason => { });
  }

  saveSprint() {
    this.sprintService.add(this.newSprint).subscribe(() => {
      this.getSprints(this.newSprint.sprintNo);
    });
    this.projectService.setActiveSprint(this.newSprint);
  }

  getLatestSprint() {
    if (this.sprints.length > 0) {
      return this.sprints[this.sprints.length - 1];
    } else {
      return this.newSprint;
    }
  }

  saveBliToSprint() {
    this.enableEditing = false;
    this.backlogItemsForSprint.forEach(item => {
      // no array entry yet
      if (!this.selectedSprint.backlogItems) {
        this.selectedSprint.backlogItems = new Array();
      }
      this.selectedSprint.backlogItems.push(item._id);
    });

    this.sprintService
      // Write Bli's to Sprint
      .add(this.selectedSprint).subscribe(savedSprint => {
        // Change Status to SPRINT
        this.backlogService
          .editMany(
          { _id: { $in: this.selectedSprint.backlogItems } },
          { $set: { status: 'SPRINT' } }
          )
          .subscribe(result => { });
      });
  }

  setSelectedSprint(sprint: Sprint) {
    this.selectedSprint = sprint;
    this.getSprintItems();
    if (this.modal) {
      this.modal.close();
    }
  }

  cancelSprintCreation() {
      this.selectedSprint = this.getLatestSprint();
    }
}
