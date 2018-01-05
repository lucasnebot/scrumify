import { BaseModel } from './baseModel';

export class Sprint extends BaseModel {
  sprintNo: number;
  start: string;
  end: string;
  backlogItems: string[];
  project: string;
}
