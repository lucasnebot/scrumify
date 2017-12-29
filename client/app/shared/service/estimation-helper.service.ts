import { Injectable } from '@angular/core';
import { BacklogItem, Vote } from '../model';

@Injectable()
export class EstimationHelperService {
  reestimationNeeded = false;
  constructor() {}
  /**
   * Orders the estimation votes of an BLI by estimation value
   * @param item
   */
  orderVotesByEstimation(item: BacklogItem) {
    item.voted.sort((a: Vote, b: Vote) => {
      return a.estimation - b.estimation;
    });
  }
  /**
   * Returns the BLIs' median of the estimation votes
   * @param item 
   */
  getEstimationMedian(item: BacklogItem): number {
    let median: number;

    // Sort by estimation in ascending order
    this.orderVotesByEstimation(item);
    // Number of votes is even --> calculate median in between estimations
    if (item.voted.length % 2 === 0) {
      let midLow = item.voted.length / 2 - 1;
      let midHigh = item.voted.length / 2;
      // Cast to number nessessary for some reason. Else values are treated like strings
      median =
        (Number(item.voted[midLow].estimation) +
          Number(item.voted[midHigh].estimation)) /
        2;
      // Number of votes is odd --> extract median from array element in the center
    } else {
      const indexMid = Math.floor(item.voted.length / 2);
      median = Number(item.voted[indexMid].estimation);
    }
    return median;
  }
  /**
   * Determintes if the given estimations are in an acceptable range.
   * @param item 
   */
  estimationRangeAcceptable(item: BacklogItem): boolean {
    this.orderVotesByEstimation(item);
    if (
      item.voted[0].estimation * 2 <=
      item.voted[item.voted.length - 1].estimation
    ) {
      return false;
    }
    return true;
  }

}
