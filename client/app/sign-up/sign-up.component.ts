import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model';
import { UserService, ProjectService } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 2,
    projects: []
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {}

  signUp() {
    // Turns the value from the http-form-element e.g. "0" to a number
    this.user.role = Number(this.user.role);
    this.userService
      .signUp(this.user)
      .subscribe((resp: User) => {
        //TODO : The navigation doesn't wait for project members to be added! ZIP observables?
        //this.projectService.addProjectMember(resp._id);
        this.router.navigate(['/']);
      });
  }
}
