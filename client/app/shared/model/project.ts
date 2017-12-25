import {BaseModel} from './baseModel';
export class Project extends BaseModel {
    name: string;
    vision: string;
    defDone?: string;
    sprintDuration?: number;
    users?: string[];
    backlogitems?: string[];
}