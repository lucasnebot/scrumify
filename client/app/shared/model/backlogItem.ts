import {BaseModel,Task} from './';

export interface Vote{
    votedBy: string,
    estimation: number
}
export class BacklogItem extends BaseModel {
 title: string;
 description : string;
 order: number;
 estimation: number;
 status: 'EPIC' | 'RFE' | 'RFS' | 'SPRINT'| 'DONE';
 task: Task[];
 voted: Vote[];
}
