import { Task } from './task';
import { BaseModel } from './baseModel';

export interface Vote {
  voterName: string;
  voterEmail: string;
  estimation: number;
}
export class BacklogItem extends BaseModel {
  title: string;
  description: string;
  order: number;
  estimation: number;
  status: 'EPIC' | 'RFE' | 'REEST' | 'RFS' | 'SPRINT' | 'DONE';
  task: Task[];
  voted: Vote[];
  project: string;
}
