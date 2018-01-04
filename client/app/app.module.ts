// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './shared/httpInterceptors/authTokenInterceptor';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncateModule } from 'ng2-truncate';
import {MomentModule} from 'angular2-moment';

// Services
import {
  MilestoneService,
  UserService,
  BacklogService,
  AuthService,
  AuthGuardService,
  ProjectService,
  SprintService,
  EstimationHelperService
} from './shared/service';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BacklogComponent } from './backlog/backlog.component';
import { HomeComponent } from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { EffortEstimationComponent } from './effort-estimation/effort-estimation.component';
import { BliCardComponent } from './shared/component/bli-card/bli-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    RoadmapComponent,
    HomeComponent,
    SignUpComponent,
    NavbarComponent,
    SprintPlanningComponent,
    ScrumboardComponent,
    EffortEstimationComponent,
    BliCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    TruncateModule,
    MomentModule
  ],
  providers: [
    BacklogService,
    MilestoneService,
    UserService,
    AuthService,
    AuthGuardService,
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    SprintService,
    EstimationHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
