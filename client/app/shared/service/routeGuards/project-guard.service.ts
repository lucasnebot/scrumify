import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {ProjectService} from '../project.service';

@Injectable()
export class ProjectGuardService implements CanActivate {
  constructor(private router : Router, private projectService: ProjectService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.projectService.project){
      return true;
    }
    this.router.navigate(['/projects'])
    return false;
  }

}
