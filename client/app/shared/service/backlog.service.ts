import { Observable } from 'rxjs/Observable';
import { BacklogItem, Vote } from './../model';
import { GenericService } from './generic.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class BacklogService extends GenericService<BacklogItem> {
  constructor(http: HttpClient, public authService: AuthService) {
    super(http, '/backlogItem');
  }
  updateOrder(update: Object[]): Observable<any> {
    return this.http.put(this.BASE_URL + `${this.actionUrl}`, update);
  }

  getReadableStatus(status: string):string{
      switch(status){
          case "EPIC":
          return "";
          case "RFE":
          return "Ready for Estimation";
          case "RFS":
          return "Ready for Sprint";
          case "SPRINT":
          return "Sprint";
          case "DONE":
          return "Done";
          default:
          return status;
      }
  }

  getType(bli:BacklogItem): string{
    if(bli.status == "EPIC"){
        return 'Epic';
    }
    else{
        return 'User Story';
    }
  }
  
  /**
   * Adds a vote object with the estimation
   * @param id
   * @param estimation
   */
  voteOn(id: string, estimation: number) {
    const vote: Vote = {
      voterEmail: this.authService.activeUser.email,
      estimation: estimation
    };
    return this.edit(id, { $push: { voted: vote } }, true);
  }

  hasAlreadyVotedOn(item: BacklogItem): boolean {
     let alreadyVoted = false;
    item.voted.forEach(vote => {
      if (vote.voterEmail === this.authService.activeUser.email) {
        alreadyVoted = true;
      }
    });
    return alreadyVoted;
  }

  countVotes(item: BacklogItem): number{
    return item.voted.length;
 }
}
