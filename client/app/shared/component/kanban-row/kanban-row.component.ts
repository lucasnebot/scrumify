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
      this.modal.close();
      //reset form
      this.newTask = this.getEmptyTask();
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

  open(content, index?: number) {
    //reset stuff
    this.errorNotFound = false
    this.userFound = null;
    this.userSearchString = "";
    //
    if (index >= 0) {
      this.selectedTask = this.tasks[index];
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

  removeTask(index: number) {
    this.taskService.delete(this.tasks[index]._id).subscribe(result => {
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
        task.doneTimestamp = moment().format();
      }

      this.taskService.edit(task._id, task).subscribe(result => {
        console.log('Updated !');
      });
    }
  }

  searchForUser(mode: String){
    if(mode == 'new'){
      this.userService.getAll({name: this.userSearchString}).subscribe((result=>{
        if(result.length > 0){
          this.errorNotFound = false;
          this.newTask.user = result[0]._id;
          this.userFound = result[0];
        }
        else{
          this.errorNotFound = true;
          this.userFound = null;
        }
      }))

      if(mode == 'edit'){
        this.userService.getAll({name: this.userSearchString}).subscribe((result=>{
          if(result.length > 0){
            this.errorNotFound = false;
            this.selectedTask.user = result[0]._id;
          }
          else{
            this.errorNotFound = true;
            this.userFound = null;
          }
        }))
      }
    }
    }

}
