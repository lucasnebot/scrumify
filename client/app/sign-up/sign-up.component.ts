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
  productOwnerExists = false;
  scrumMasterExists = false;
  user: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 2,
    project: []
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.checkExistingRoles();
  }

  checkExistingRoles(): void {
    // TODO : project specific call
    this.userService.getAll().subscribe(docs => {
      // Find Scrum Master in Team
      if (docs.some(doc => doc.role === 0)) {
        this.scrumMasterExists = true;
      }
      // Find Product Owner in Team
      if (docs.some(doc => doc.role === 1)) {
        this.productOwnerExists = true;
      }
    });
  }
  signUp() {
    // Turns the value from the http-form-element e.g. "0" to a number
    this.user.role = Number(this.user.role);
    this.userService
      .signUp(this.user)
      .subscribe((resp: User) => {
        // Add User to project
        //TODO : The navigation doesn't wait for project members to be added! Chain observables?
        this.projectService.addProjectMember(resp._id);
        // ? Navigate to project selection?
        this.router.navigate(['/']);
      });
  }
}
