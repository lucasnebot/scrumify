import {User} from '.';
import {BaseModel} from './baseModel';
export class Task extends BaseModel {
    title: string;
    description: string;
    user: User;
}
