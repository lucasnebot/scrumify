import { BaseModel } from './';

export class Sprint extends BaseModel {
  sprintNo: number;
  start: string;
  end: string;
  backlogItems: string[];
}
