import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { UserStory } from '../shared/model/userStory';

=======
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 060c9e396a9af46e090b4fdcff493f9a039eaae3
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[];
  selectedItem: BacklogItem;
  dragEnabled = false;
  constructor(private backlogService: BacklogService, private modalService: NgbModal){
    this.selectedItem = {title: '', description: '', order: 0}
  }



  ngOnInit() {
   this.getBacklogItems();
  }

  getBacklogItems(){
    this.backlogService.getAll().subscribe(data => {
      this.backlogItems = data;
     this.backlogItems = this.backlogItems.sort(
       (t1,t2) => {
         return t1.order - t2.order})
       })
  }

  updateOrder(){
console.log('updateOrder called')
    //   this.backlogService.edit(item._id,item).subscribe((data) => {console.log('Updated')});
  }
  
  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }


  saveItem(){
    console.log('Save Item')
  }
}
