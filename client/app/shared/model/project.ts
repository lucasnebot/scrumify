import {BaseModel} from './baseModel';
export class Project extends BaseModel {
    name: string;
    vision: string;
    defDone?: string;
    users?: string[];
    backlogitems?: string[];
}