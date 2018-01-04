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
  tasks: Task[];
  voted: Vote[];
}
