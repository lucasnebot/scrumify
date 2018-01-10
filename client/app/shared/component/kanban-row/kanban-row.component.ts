import { BacklogService } from './../../service/backlog.service';
import { forEach } from '@angular/router/src/utils/collection';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './../../service/task.service';
import { BacklogItem, Task } from './../../model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-row',
  templateUrl: './kanban-row.component.html',
  styleUrls: ['./kanban-row.component.css']
})
export class KanbanRowComponent implements OnInit {
  @Input() backlogItem: BacklogItem;
  @Input() taskStates: string[];
  modal;
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    user: null,
    status: 'TODO',
    estimation: 0,
    backlogItem: ''
  };
  taskContainer: Task[][] = [];
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private backlogService: BacklogService
  ) {}

  ngOnInit() {
    if (this.backlogItem.tasks) {
      console.log('WHoop!');
      this.taskService
        .getAll({ backlogItem: this.backlogItem._id })
        .subscribe(result => {
          this.tasks = result;
          this.sortTasks();
        });
    }
  }

  saveNewTask() {
    this.newTask.backlogItem = this.backlogItem._id;
    this.taskService.add(this.newTask).subscribe((newTask: Task) => {
      this.tasks.push(newTask);
      this.sortTasks();
      this.modal.close();
      //reset form
      this.newTask = {
        title: '',
        description: '',
        user: null,
        status: 'TODO',
        estimation: 0,
        backlogItem: ''
      };
    });
  }

  sortTasks() {
    this.taskStates.forEach((state, index) => {
      this.taskContainer[index] = [];
      this.tasks.forEach(task => {
        if (task.status.toLowerCase() == state.toLowerCase()) {
          this.taskContainer[index].push(task);
        }
      });
    });
  }

  getUsedStoryPoints() {
    let storyPoints: number = 0;
    this.tasks.forEach((task: Task) => {
      storyPoints += task.estimation;
    });
    return storyPoints;
  }

  getAvailableStoryPoints() {
    return this.backlogItem.estimation - this.getUsedStoryPoints();
  }

  open(content) {
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => {}, reason => {});
  }
}
