import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BacklogComponent} from './backlog/backlog.component';
import {HomeComponent} from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from './shared/service';


const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuardService]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuardService]},
  {path: '*', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'sprint-planning',component: SprintPlanningComponent}
]

@NgModule({
exports: [RouterModule],
imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }


