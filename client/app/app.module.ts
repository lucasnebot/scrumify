import { backlogService } from './shared/service/backlogService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BacklogComponent } from './backlog/backlog.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    MilestoneComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [backlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
