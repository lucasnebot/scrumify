import { forEach } from '@angular/router/src/utils/collection';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './../../service/task.service';
import { BacklogItem, Task } from './../../model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-canban-row',
  templateUrl: './canban-row.component.html',
  styleUrls: ['./canban-row.component.css']
})
export class CanbanRowComponent implements OnInit {
  @Input() backlogItem: BacklogItem;
  @Input() taskStates: string[];
  modal;
  tasks: Task[];
  newTask: Task = {
    title: '',
    description: '',
    user: null,
    status: 'TODO'
  };
  taskContainer = [];
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.backlogItem.tasks) {
      console.log('WHoop!')
      this.taskService
        .getAll({ _id: { $in: this.backlogItem.tasks } })
        .subscribe(result => {
          this.tasks = result;
          this.sortTasks();
        });
    }
  }

  saveNewTask() {
    this.taskService.add(this.newTask).subscribe(() => {
      this.modal.close();
      //reset form
      this.newTask = {
        title: '',
        description: '',
        user: null,
        status: 'TODO'
      };
    });
  }

  sortTasks(){
    this.tasks.forEach((task)=>{
  
      this.taskStates.forEach((state,index)=>{
        //initialize array
        if(!this.taskContainer[index]){
          this.taskContainer[index] = [];
        }
        if(task.status.toLowerCase() == state.toLowerCase()){          
          this.taskContainer[index].push(task);
        }
      })
    })

    console.log(this.taskContainer);
  }

  open(content) {
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => {}, reason => {});
  }
}
