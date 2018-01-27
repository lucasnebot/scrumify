import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../shared/model/sprint';
import * as moment from 'moment';
import { ProjectService } from '../shared/service/project.service';
import { SprintService } from '../shared/service/sprint.service';
import { forEach } from '@angular/router/src/utils/collection';
import { TaskService } from '../shared/service/task.service';
import { Task } from '../shared/model/task';
import { BacklogItem } from '../shared/model/index';
import { BacklogService } from '../shared/service/backlog.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  private sprint: Sprint;
  private backlogItems: BacklogItem[];
  private totalStoryPoints: number;
  private idealBurnData: Array<any> = [];
  private actualBurnData: Array<any> = [];

  isDataLoaded = false;

  lineChartLabels: Array<any> = [];
  lineChartData: Array<any> = [];
  lineChartType = 'line';
  lineChartOptions = {
    responsive: false,
    title: {
      display: true,
      text: 'Burndown Chart'
    },
    legend: {
      display: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    scales: {
      yAxes: [
        {
          ticks: {
            max: this.totalStoryPoints,
            min: 0
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Story Points'
          }
        }
      ]
    }
  };

  public lineChartColors: Array<any> = [
    {
      // red
      borderColor: 'rgba(255,0,0,0.25)'
    },
    {
      // dark grey
      borderColor: 'rgba(0,120,200,0.75)'
    }
  ];

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private taskService: TaskService,
    private backlogItemService: BacklogService
  ) { }

  ngOnInit() {
    this.sprintService
      .getOne(localStorage.getItem('activeSprint'))
      .subscribe(result => {
        this.sprint = result;
        this.sprint = result;
        this.backlogItemService
          .getAll({ _id: { $in: this.sprint.backlogItems } })
          .subscribe(items => {
            this.backlogItems = items;
            this.setLineChartLabels();
            this.calculateAverage();
            // Noch nichts berechnen, wenn der Sprint noch nicht angefangen hat
            if (moment().isBefore(moment(this.sprint.start)) === false) {
            this.calculateActual();
            }
            this.isDataLoaded = true;
          });
      });
    this.totalStoryPoints = this.projectService.project.storyPointsPerSprint;
  }

  private setLineChartLabels() {
    const startMoment: moment.Moment = moment(this.sprint.start);
    const endMomet: moment.Moment = moment(this.sprint.end);
    const daysBetween: number = endMomet.diff(startMoment, 'days');

    // Set start date
    this.lineChartLabels.push(startMoment.format('DD. MMM'));
    for (let i = 0; i < daysBetween; i++) {
      this.lineChartLabels.push(startMoment.add(1, 'days').format('DD. MMM'));
    }
  }

  private calculateActual() {
    const localDataArray: number[] = [];
    let localStoryPoints = this.totalStoryPoints;

    this.taskService
      .getAll({ status: 'DONE', backlogItem: { $in: this.backlogItems } })
      .subscribe(tasks => {
        if (this.lineChartLabels) {
          // For each value of the x-axis
          this.lineChartLabels.forEach(day => {
            const a = moment(day);
            const c = moment();
            if (c.isBefore(a, 'date') === true) {
              tasks.forEach(task => {
                const b = moment(task.doneTimestamp).format('DD. MMM');
                // Current day on the x-axis equals day on y-axis
                if (a.diff(b, 'days') === 0) {
                  localStoryPoints = localStoryPoints - task.estimation;
                }
              });
              localDataArray.push(localStoryPoints);
            }
          });
          this.actualBurnData = [
            {
              data: localDataArray,
              label: 'Actual',
              marker: { radius: 6 },
              fill: false
            }
          ];
        }
        this.lineChartData = this.idealBurnData.concat(this.actualBurnData);
      });
  }

  /**
   * Calculates the data for an ideal burndown
   */
  private calculateAverage() {
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
      {
        data: localDataArray,
        label: 'Average (Velocity)',
        lineWidth: 2,
        fill: false
      }
    ];
    this.lineChartData = this.idealBurnData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
