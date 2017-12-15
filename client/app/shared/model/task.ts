import {BaseModel, User} from './index';

export class Task extends BaseModel {
    title: string;
    description: string;
    user: User;
}
