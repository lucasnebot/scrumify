import { UserStory } from './../shared/model/userStory';
import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[];
  newBacklogItem: UserStory = {title: '', description: '', order: 0, estimation:0,status:'NEW',task:[]};
  selectedIndex;
  modal;
  constructor(private backlogService: BacklogService, private modalService: NgbModal){
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
  
  open(content,index) {
    this.selectedIndex = index;
    console.log(this.selectedIndex);
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {

    }, (reason) => {
    });
    
  }

  isUserStory(){
  return  this.backlogItems[this.selectedIndex].hasOwnProperty('type'); 
}

  saveItem(index){
    console.log('Save Item');
    this.backlogService.edit(this.backlogItems[index]._id,this.backlogItems[index]).subscribe((success) => {
      this.modal.close();
    })
  }
}
