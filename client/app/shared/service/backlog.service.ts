import { Observable } from 'rxjs/Observable';
import { BacklogItem, Vote } from './../model';
import { GenericService } from './generic.service';
import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class BacklogService extends GenericService<BacklogItem> {
  constructor(
    http: HttpClient,
    public authService: AuthService,
    public projectService: ProjectService
  ) {
    super(http, '/backlogItem');
  }
  updateOrder(update: Object[]): Observable<any> {
    return this.http.put(this.BASE_URL + `${this.actionUrl}`, update);
  }

  getReadableStatus(status: string): string {
    switch (status) {
      case 'EPIC':
        return '';
      case 'RFE':
        return 'Ready for Estimation';
      case 'REEST':
        return 'Reestimation needed'
      case 'RFS':
        return 'Ready for Sprint';
      case 'SPRINT':
        return 'Sprint';
      case 'DONE':
        return 'Done';
      default:
        return status;
    }
  }

  getType(bli: BacklogItem): string {
    if (bli.status == 'EPIC') {
      return 'Epic';
    } else {
      return 'User Story';
    }
  }
// TODO : extract code blocks
  /**
   * Adds a vote object with the estimation
   * @param id Id of the BLI
   * @param estimation Estimated effort for BLI
   */
  voteOn(item: BacklogItem, estimation: number): Observable<BacklogItem> {
    // Construct new vote
    const vote: Vote = {
      voterName: this.authService.activeUser.name,
      voterEmail: this.authService.activeUser.email,
      estimation: estimation
    };

    // If this vote is the last one to complete the estimation
    if (item.voted.length + 1 === this.projectService.numberOfDevelopers) {
      // Add vote locally
      item.voted.push(vote);
      // Sort by estimation in ascending order
      item.voted.sort((a: Vote, b: Vote) => {
        return a.estimation - b.estimation;
      });

      // ! Calculate estimation median
      let median: number;
      // Number of votes is even --> calculate median in between estimations
      if (item.voted.length % 2 === 0) {
        let midLow = item.voted.length/2-1
        let midHigh = item.voted.length/2;
        // Cast to number nessessary for some reason. Else values are treated like strings
        median =
          (Number(item.voted[midLow].estimation) + Number(item.voted[midHigh].estimation))/2;
        // Number of votes is odd --> extract median from array element in the center
      } else {
        median = Number(item.voted[item.voted.length / 2].estimation);
      }
      // The new vote is added to the array and estimation & new status are set
      return this.edit(item._id, { 
        $push: { voted: vote },
        estimation: median,
        status: 'RFS'
       }, true);
    }
    // Only the new vote is added
    return this.edit(item._id, { $push: { voted: vote } }, true);
  }
  /**
   * Checks if the active user already voted on a given BLI
   * @param item The BLI to be checked
   */
  hasAlreadyVotedOn(item: BacklogItem): boolean {
    let alreadyVoted = false;
    item.voted.forEach(vote => {
      if (vote.voterEmail === this.authService.activeUser.email) {
        alreadyVoted = true;
      }
    });
    return alreadyVoted;
  }
}
