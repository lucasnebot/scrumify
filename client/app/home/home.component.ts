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
  newProject: Project = {
    name: '',
    vision: '',
    sprintDuration: null
  }
  loginFailed = false;
  users: User[];

  constructor(
    public authService: AuthService,
    public projectService: ProjectService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.authService.authenticated){
      this.userService.getAll().subscribe((docs) => {
        this.users = docs;
      })
    }
  }
  signIn() {
    this.authService.signIn(this.signInData).subscribe(() => {
      this.loginFailed = !this.authService.authenticated;
      // Can be switched to every other route
      this.router.navigate(['/']);
    });
  }
  createProject(){
    this.projectService.add(this.newProject).subscribe((resp) => {
      this.projectService.fetchProject();
    });
  }

}
