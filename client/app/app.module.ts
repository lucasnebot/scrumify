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

// Services
import {
  MilestoneService,
  UserService,
  BacklogService,
  AuthService,
  AuthGuardService,
  ProjectService
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

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    RoadmapComponent,
    HomeComponent,
    SignUpComponent,
    NavbarComponent,
    SprintPlanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    TruncateModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
