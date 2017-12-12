import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';
import { UserStory } from '../shared/model/userStory';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[];
  sjsOptions: {};

  constructor(private backlogService: BacklogService) { 
    this.sjsOptions = {
      onUpdate: (event: any) =>{this.updateOrder(event)}
    }
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

  updateOrder(event:any){
    console.log(event);
    //get Item
    let item:BacklogItem = this.backlogItems.find(item => item.order === event.newIndex);
    //get Item before that
    let itemBefore:BacklogItem = this.backlogItems.find(item => item.order === event.newIndex--);
    //    
    item.order = itemBefore.order+1;

    this.backlogService.edit(item._id,item).subscribe((data) => {console.log('Updated')});

  }

}
