import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BacklogComponent} from './backlog/backlog.component';
import {MilestoneComponent} from './milestone/milestone.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'backlog', component: BacklogComponent},
  {path: 'milestones', component: MilestoneComponent},
  {path: '*', component: HomeComponent}
]

@NgModule({
exports: [RouterModule],
imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }


