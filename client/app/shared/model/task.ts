import {User} from '.';
import {BaseModel} from './baseModel';
export class Task extends BaseModel {
    title: string;
    description: string;
    status: string;
    estimation: number;
    user: string;
    backlogItem: string;
    doneTimestamp: string;
}
