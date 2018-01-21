import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { Sprint } from '../shared/model/sprint';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ProjectService } from '../shared/service/project.service';
import { SprintService } from '../shared/service/sprint.service';
import { forEach } from '@angular/router/src/utils/collection';
import { TaskService } from '../shared/service/task.service';
import { Task } from '../shared/model/task';
import { BacklogItem } from '../shared/model/index';
import { BacklogService } from '../shared/service/backlog.service';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css'],
})
export class BurndownChartComponent implements OnInit {

  private sprint: Sprint;
  private backlogItems: BacklogItem[];
  private totalStoryPoints: number;

  private lineChartLabels: Array<any> = [];
  private idealBurnData: Array<any> = [];
  private actualBurnData: Array<any> = [];
  private lineChartData: Array<any> = [];
  private lineChartType = 'line';
  private lineChartOptions = {
    responsive: true,
    tooltip : {
      valueSuffix: ' hrs',
      crosshairs: true,
      shared: true
    }
  };

  public lineChartColors:Array<any> = [
    { // red
      borderColor: 'rgba(255,0,0,0.25)',
    },
    { // dark grey
      borderColor: 'rgba(0,120,200,0.75)',
    }
  ];

  private isDataLoaded: boolean;

  constructor(private projectService: ProjectService,
    private sprintService: SprintService, private taskService: TaskService,
    private backlogItemService: BacklogService) {
      this.isDataLoaded = false;
  }

  ngOnInit() {
    this.totalStoryPoints = this.projectService.project.storyPointsPerSprint;
    this.sprintService.getOne(this.projectService.project.activeSprint).subscribe(sprint => {
      this.sprint = sprint;
      this.backlogItemService.getAll({ _id: { $in: sprint.backlogItems } }).subscribe(items => {
        this.backlogItems = items;
        this.setLineChartLabels();
        this.calculateIdealBurn();
        this.calculateActualBurn();
      });
    });
  }

  private setLineChartLabels() {
    const startMoment: Moment = moment(this.sprint.start);
    const endMomet: Moment = moment(this.sprint.end);
    const daysBetween: number = endMomet.diff(startMoment, 'days');

    // Set start date
    this.lineChartLabels.push(startMoment.format('LL'));
    for (let i = 0; i < daysBetween; i++) {
      this.lineChartLabels.push(startMoment.add(1, 'days').format('LL'));
    }
  }

  private calculateActualBurn() {
    const localDataArray: number[] = [];
    let localStoryPoints = this.totalStoryPoints;

    this.taskService.getAll({ status: 'DONE', backlogItem: { $in: this.backlogItems } })
      .subscribe(tasks => {
        if (this.lineChartLabels) {
          this.lineChartLabels.forEach(day => {
            const a = moment(day);
            let apply = false;
            tasks.forEach(task => {
              const b = moment(task.doneTimestamp);

              if (a.diff(b, 'days') === 0) {
                localStoryPoints = localStoryPoints - task.estimation;
                apply = true;
              }
            });
            if (apply) {
              localDataArray.push(localStoryPoints);
            }
          });
          this.actualBurnData = [
            {data: localDataArray, label: 'Actual Burn', marker: { radius: 6 }}
          ];
        }
        this.lineChartData = this.idealBurnData.concat(this.actualBurnData);
        this.isDataLoaded = true;
      });
  }

  /**
   * Calculates the data for an ideal burndown
   */
  private calculateIdealBurn() {
    const sprintDuration: number = this.projectService.project.sprintDuration;
    const pointsPerDay: number = this.totalStoryPoints / sprintDuration;
    const localDataArray: number[] = [];

    let x: number = this.totalStoryPoints;
    localDataArray.push(x);
    for (let i = 0; i < sprintDuration; i++) {
      x = x - pointsPerDay;
      localDataArray.push(x);
    }
    // Set data in object variable
    this.idealBurnData = [
      { data: localDataArray, label: 'Ideal Burn', lineWidth: 2 }
    ];
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
