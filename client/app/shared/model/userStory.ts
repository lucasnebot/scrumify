import { BacklogItem, Task } from './index';

export class UserStory extends BacklogItem {
    estimation: number;
    status: 'NEW' | 'RFE' | 'RFS';
    task: Task[];
}
