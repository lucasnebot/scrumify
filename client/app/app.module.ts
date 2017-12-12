// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DndModule} from 'ng2-dnd';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BacklogComponent } from './backlog/backlog.component';
import { HomeComponent } from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

// Services
import { BacklogService } from './shared/service/backlog.service';
import { MilestoneService } from './shared/service/milestone.service';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    RoadmapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    BacklogService,
    MilestoneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
