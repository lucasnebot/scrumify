import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from './../shared/service/project.service';
import { BacklogItem, Sprint } from './../shared/model/.';
import { BacklogService, SprintService } from './../shared/service/.';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.css']
})
export class SprintPlanningComponent implements OnInit {
  modal;
  createNewSprint = false;
  backlogItems: BacklogItem[] = [];
  backlogItemsForSprint: BacklogItem[] = [];

  newSprint: Sprint;
  activeSprint: Sprint;
  selectedSprint: Sprint;
  sprints: Sprint[];
  upcomingSprints: Sprint[];

  constructor(public projectService: ProjectService, public backlogService: BacklogService, public sprintService: SprintService
    , private modalService: NgbModal, private route: ActivatedRoute) {

    // Sprint Daten von Resolver holen
    route.data.subscribe(data => {
      this.sprints = data['sprints'];

      // Sprint Daten (falls vorhanden) nach Datum sortieren
      this.sprints = this.sprints.sort((a, b) => {
        return +new Date(a.end) - +new Date(b.end);
      });
      this.initialize();
    });
  }

  ngOnInit() {
    this.getBacklogItems();
  }

  initialize() {
    // Upcoming sprints setzen
    this.upcomingSprints = this.sprints;

    if (localStorage.getItem('activeSprint')) {
      // Aktuellen Sprint holen
    this.sprintService.getOne(localStorage.getItem('activeSprint')).subscribe(result => {
      this.activeSprint = result;
      if (this.activeSprint) {
        this.upcomingSprints = this.sprints.filter(element => {
          return element._id !== this.activeSprint._id;
        });
      }
    });
    }

    // Wenn keine Sprints vorhanden sind default => neuen Sprint selektiren
    if (this.sprints.length === 0) {
      // Objekt für neuen Sprint initialisieren
      this.newSprint = {
        start: moment().format('YYYY-MM-DD'),
        end: moment().add(this.projectService.project.sprintDuration, 'days').format('YYYY-MM-DD'),
        sprintNo: 1,
        backlogItems: [],
        project: this.projectService.project._id,
      };
      this.selectedSprint = this.newSprint;
    } else {

      // Objekt für neuen Sprint mit richtigen Startwerten versehen
      const latestSprint = this.sprints[this.sprints.length - 1];
      this.newSprint = {
        start: moment(latestSprint.end).add(1, 'days').format('YYYY-MM-DD'),
        end: moment(latestSprint.end).add(this.projectService.project.sprintDuration + 1, 'days').format('YYYY-MM-DD'),
        sprintNo: latestSprint.sprintNo + 1,
        backlogItems: [],
        project: this.projectService.project._id

      };
      this.selectedSprint = this.sprints[0];
      this.getSprintItems();
    }
  }

  /**
   * Lädt alle Backlogitems mit dem Status 'RFS' aus dem aktuellen Projekt
   */
  getBacklogItems() {
    this.backlogService.getAll({ status: 'RFS', project: this.projectService.project._id }).subscribe(result => {
      this.backlogItems = result;
    });
  }

  /**
   * Lädt alle Backlogitems des ausgewählten Sprints
   */
  getSprintItems() {
    // if bli are present
    if (this.selectedSprint && this.selectedSprint.backlogItems.length > 0) {
      // sprint has already been planned
      // get bli's for current selected sprint
      this.backlogService
        .getAll({ _id: { $in: this.selectedSprint.backlogItems } })
        .subscribe(result => {
          this.backlogItemsForSprint = result;
        });
    } else {
      this.backlogItemsForSprint = [];
    }
  }

  /**
   * Setzt den aktuellen Sprint und lädt die zugehörigen Backlogitems
   * @param sprint
   */
  setSelectedSprint(sprint: Sprint) {
    this.selectedSprint = sprint;
    this.getSprintItems();
    if (this.modal) {
      this.modal.close();
    }
  }

  /**
   * Berechnet die aktuell vergebenen Story Points
   */
  getTotalStoryPointUsage(): number {
    let usage = 0;
    if (this.backlogItemsForSprint) {
      this.backlogItemsForSprint.forEach(item => {
        usage += item.estimation;
      });
    }
    return usage;
  }

  /**
   * Warnmeldung in der View
   */
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
  /**
   * If inital is not set, a sprint is added to existing sprint list. Therefore a min property is bound to the datepicker.
   */
  open(content, initial?) {
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => { }, reason => { });
  }

  /**
   * Fügt die ausgewählten Items dem Sprint hinzu und speichert diesen ab.
   */
  saveBliToSprint() {
    this.createNewSprint = false;
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
        this.selectedSprint = savedSprint;

        // MEGA WICHTIG
        if (moment().startOf('day').isSameOrAfter(moment(savedSprint.start).startOf('day'), 'day')) {
          localStorage.setItem('activeSprint', savedSprint._id);
        }

        // Change Status to SPRINT
        this.backlogService
          .editMany(
          { _id: { $in: this.selectedSprint.backlogItems } },
          { $set: { status: 'SPRINT' } }
          )
          .subscribe(result => {
            this.initialize();
          });
      });
    this.createNewSprint = false;
  }

  /**
   * Wird aufgerufen wenn aus dem modalen Dialog ein
   * neuer Sprint erzeugt wird.
   * @param sprint
   */
  createSprint(sprint: Sprint) {
    this.setSelectedSprint(sprint);
    this.createNewSprint = true;
    this.sprints.push(sprint);
  }

  /**
   * Bricht die Erstellung eines neuen Sprints ab
   */
  cancelSprintCreation() {
    this.createNewSprint = false;
    this.sprints.pop();
    this.initialize();
  }

  calcEndDate() {
    const sprintDuration = this.projectService.project.sprintDuration;
    this.newSprint.end = moment(this.newSprint.start)
      .add(sprintDuration, 'days')
      .format('YYYY-MM-DD');
    // this.projectService.project.sprintDuration
  }
}
