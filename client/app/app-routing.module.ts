import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BacklogComponent} from './backlog/backlog.component';
import {HomeComponent} from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from './shared/service';
import {EffortEstimationComponent } from './effort-estimation/effort-estimation.component' 


const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuardService]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuardService]},
  {path: '*', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'sprint-planning',component: SprintPlanningComponent},
  {path: 'scrumboard', component: ScrumboardComponent},
  {path: 'effortEstimation', component: EffortEstimationComponent, canActivate: [AuthGuardService]}
]

@NgModule({
exports: [RouterModule],
imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }


