import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BacklogComponent} from './backlog/backlog.component';
import {HomeComponent} from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService, ProjectGuardService } from './shared/service';
import {EffortEstimationComponent } from './effort-estimation/effort-estimation.component';
import {ProjectExplorerComponent } from './project-explorer/project-explorer.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';
import { SprintResolver } from './shared/service/sprint.resolver';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuardService, ProjectGuardService]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuardService, ProjectGuardService]},
  {path: '*', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'sprint-planning', component: SprintPlanningComponent, canActivate: [AuthGuardService, ProjectGuardService]
    , resolve: {sprints: SprintResolver}},
  {path: 'scrumboard', component: ScrumboardComponent, canActivate: [AuthGuardService, ProjectGuardService]},
  {path: 'effortEstimation', component: EffortEstimationComponent, canActivate: [AuthGuardService, ProjectGuardService]},
  {path: 'projects', component: ProjectExplorerComponent, canActivate: [AuthGuardService] },
  {path: '**', component: HomeComponent} // wildcard route! Has to be the LAST route!
];

@NgModule({
exports: [RouterModule],
imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }


