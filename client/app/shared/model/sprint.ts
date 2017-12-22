import { BaseModel } from './';

export class Sprint extends BaseModel {
  sprintNo: number;
  start: Date;
  end: Date;
  backlogitem: string;
}
