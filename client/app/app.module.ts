// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BacklogComponent } from './backlog/backlog.component';
import { HomeComponent } from './home/home.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Services
import {
  MilestoneService,
  UserService,
  BacklogService
} from './shared/service';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    RoadmapComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SortablejsModule.forRoot({ animation: 100 })
  ],
  providers: [BacklogService, MilestoneService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
