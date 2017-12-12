import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BacklogComponent} from './backlog/backlog.component';
import {HomeComponent} from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'backlog', component: BacklogComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: '*', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent}
]

@NgModule({
exports: [RouterModule],
imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }


