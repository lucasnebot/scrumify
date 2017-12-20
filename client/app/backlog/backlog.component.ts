import { BacklogItem } from './../shared/model/backlogItem';
import { BacklogService } from './../shared/service/backlog.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TruncateModule } from 'ng2-truncate';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[];
  newBacklogItem: BacklogItem = {
    title: '',
    description: '',
    order: 0,
    estimation: 0,
    status: 'EPIC',
    task: [],
    voted: []
  };
  selectedIndex;
  newMode = 'User Story';
  modal;

  constructor(
    private backlogService: BacklogService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getBacklogItems();
    console.log(this.newMode);
  }

  getBacklogItems() {
    this.backlogService.getAll().subscribe(data => {
      this.backlogItems = data;
      this.backlogItems = this.backlogItems.sort((t1, t2) => {
        return t1.order - t2.order;
      });
    });
  }

  remove(index: number) {
    this.backlogService
      .delete(this.backlogItems[index]._id)
      .subscribe(element => {
        this.backlogItems.splice(index, 1);
      });
  }

  updateOrder() {
    console.log('updateOrder called');
    //   this.backlogService.edit(item._id,item).subscribe((data) => {console.log('Updated')});
  }

  open(content, index) {
    this.selectedIndex = index;
    console.log(this.selectedIndex);
    this.modal = this.modalService.open(content);
    this.modal.result.then(result => {}, reason => {});
  }

  selectedIsUserstory() {
    return this.backlogItems[this.selectedIndex].status != 'EPIC';
  }

  editItem(index) {
    this.backlogService
      .edit(this.backlogItems[index]._id, this.backlogItems[index])
      .subscribe(success => {
        this.modal.close();
      });
  }

  saveNewItem() {
    if (this.newMode === 'Epic') {
      this.newBacklogItem.status = 'EPIC';
    } else {
      this.newBacklogItem.status = 'RFE';
    }
    this.backlogService.add(this.newBacklogItem).subscribe((data) => {
      this.backlogItems.push(data);
      this.modal.close();
    })
  }
}
