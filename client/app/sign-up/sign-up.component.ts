import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model';
import { UserService } from '../shared/service';
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
    name:'',
    surname:'',
    email:'',
    password:'',
    role: 2
  }
  constructor(private userService: UserService, private router: Router) { }
 
  ngOnInit() {
    this.checkExistingRoles();
  }

  checkExistingRoles(): void {
    this.userService.getAll().subscribe((docs) => {
      // Find Scrum Master in Team
      let scrumMaster = docs.find((doc) => doc.role === 0);
      if(scrumMaster){
        this.scrumMasterExists = true;
      }
      // Find Product Owner in Team
      let productOwner = docs.find((doc) => doc.role === 1);
      if(productOwner){
        this.productOwnerExists = true;
      }
    })
  }
  signUp(){
    // TODO : Add User to project!
    // Turns the value from the http-form-element e.g. "0" to a number
    this.user.role = Number(this.user.role);
    this.userService.signUp(this.user).subscribe((resp) => {
      this.router.navigate(['/']);
    })
  }
}
