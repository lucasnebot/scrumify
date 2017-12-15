import { Component, OnInit } from '@angular/core';
import { SignInData } from '../shared/model';
import { AuthService } from '../shared/service';
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
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}
  signIn() {
    this.authService.signIn(this.signInData).subscribe(() => {
      // Can be switched to every other route
      this.router.navigate(['/']);
    });
  }
}
