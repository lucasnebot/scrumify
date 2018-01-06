import { Component } from '@angular/core';
import './rxjs-operators';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public showLoading = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoading = true;
      } else if (event instanceof NavigationCancel || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.showLoading = false;
      }
    });
  }
}
