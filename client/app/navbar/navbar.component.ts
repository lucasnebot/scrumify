import { Component, OnInit } from '@angular/core';
import {AuthService, ProjectService} from '../shared/service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, public projectService: ProjectService) { }

  ngOnInit() {
  }

}
