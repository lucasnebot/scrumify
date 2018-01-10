import { Component, OnInit } from '@angular/core';
import { SignInData, Project, User } from '../shared/model';
import { AuthService, ProjectService, UserService } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signInData: SignInData = {
    email: '',
    password: ''
  };
  loginFailed = false;
  users: User[];

  constructor(
    public authService: AuthService,
    public projectService: ProjectService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.authService.authenticated && this.projectService.project){
      //! Only Users from this project are displayed
      this.userService.getAll({projects: this.projectService.project._id}).subscribe((docs) => {
        this.users = docs;
      })
    }
  }
  signIn() {
    this.authService.signIn(this.signInData).subscribe(() => {
      this.loginFailed = !this.authService.authenticated;
      this.router.navigate(['/projects']);
    });
  }


}
