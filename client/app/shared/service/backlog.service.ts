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
}
