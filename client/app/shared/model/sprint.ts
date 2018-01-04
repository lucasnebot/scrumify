import { BaseModel } from './baseModel';

export class Sprint extends BaseModel {
  sprintNo: number;
  start: Date;
  end: Date;
  backlogItem: string[];
  project: string;
}
