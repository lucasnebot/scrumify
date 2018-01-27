import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Sprint } from '../model/sprint';
import { Injectable } from '@angular/core';
import { SprintService } from './sprint.service';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './project.service';

@Injectable()
export class SprintResolver implements Resolve<Sprint> {
    constructor(private sprintService: SprintService, private projectService: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        console.log('Active Project: ' + this.projectService.project._id);
        return this.sprintService.getAll({ project: this.projectService.project._id });
    }
}
