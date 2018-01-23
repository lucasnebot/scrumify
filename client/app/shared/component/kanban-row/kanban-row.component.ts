import { UserService } from './../../service/user.service';
import { BacklogService } from './../../service/backlog.service';
import { forEach } from '@angular/router/src/utils/collection';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './../../service/task.service';
import { BacklogItem, Task, User } from './../../model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-kanban-row',
  templateUrl: './kanban-row.component.html',
  styleUrls: ['./kanban-row.component.css']
})
export class KanbanRowComponent implements OnInit {
  @Input() backlogItem: BacklogItem;
  @Input() taskStates: string[];
  @Input() developers: User[];
  modal;
  tasks: Task[] = [];
  newTask: Task = this.getEmptyTask();
  taskContainer: Task[][] = [];
  selectedTask: Task = this.getEmptyTask();
  userSearchString: string;
  userFound: User;
  errorNotFound: boolean;
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private backlogService: BacklogService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    if (this.backlogItem.tasks) {
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

      //if new status is not done
      this.backlogService
        .edit(this.backlogItem._id, { status: 'SPRINT' })
        .subscribe(result => {
          this.backlogItem = result;
        });

      this.modal.close();
      //reset form
      this.newTask = this.getEmptyTask();
    });
  }

  getDeveloperById(id: string): User {
    return this.developers.find(dev => {
      if (dev._id == id) return true;
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

  getCardStatusClass(): string {
    let active_status = 'card-outline-primary';
    let no_tasks_status = 'card-outline-secondary';
    let done_status = 'card-outline-success';

    switch (this.getBliStatus()) {
      case 'active':
        return active_status;
      case 'no_tasks':
        return no_tasks_status;
      case 'done':
        return done_status;
      default:
        return done_status;
    }
  }

  getBliStatus(): string {
    let status = 'done';
    this.tasks.forEach(task => {
      if (task.status.toLowerCase() != 'done') {
        status = 'active';
      }
    });
    if (!this.tasks.length) {
      status = 'no_tasks';
    }
    return status;
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

  open(content, task?: Task) {
    //reset stuff
    this.errorNotFound = false;
    this.userFound = null;
    this.userSearchString = '';
    //
    if (task != null) {
      this.selectedTask = task;
    } else {
      this.selectedTask = this.getEmptyTask();
    }
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => {}, reason => {});
  }

  editTask() {
    this.taskService
      .edit(this.selectedTask._id, this.selectedTask)
      .subscribe(result => {
        this.getTasks();
        this.modal.close();
      });
  }

  removeTask(id: string) {
    this.taskService.delete(id).subscribe(result => {
      let index = this.tasks.findIndex(task => {
        if (task._id == id) {
          return true;
        }
      });
      this.tasks.splice(index, 1);
      this.sortTasks();
    });
  }

  getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      user: null,
      status: 'TODO',
      estimation: 0,
      backlogItem: '',
      doneTimestamp: ''
    };
  }
  updateStatus(task: Task, $event: any) {
    //TODO Challenge: If you manage to
    //read id property of $event without this
    //stupid workarround you get a beer from me
    let myArray = [];
    myArray.push(event.target);
    let stateIndex = myArray[0].id;
    //
    let newState = this.taskStates[stateIndex].toUpperCase();
    //if state has changed
    if (task.status != newState) {
      task.status = newState;
      if (task.status.toUpperCase() == 'DONE') {
        console.log('set to done');
        task.doneTimestamp = moment().format();
        //if task has been dropped to done, maybe all story points are used
        //and the bli needs to be set to done as well.
        console.log(this.getAvailableStoryPoints());
        if (this.getAvailableStoryPoints() == 0) {
          console.log('should go here ');
          console.log(this.getAvailableStoryPoints());
          this.backlogService
            .edit(this.backlogItem._id, { status: 'DONE' })
            .subscribe(result => {
              console.log('bli set to DONE' + task.doneTimestamp);
              this.backlogItem.status = 'DONE';
            });
        }
      }
    }

    this.taskService.edit(task._id, task).subscribe(result => {
      //task updated
    });
  }
}
