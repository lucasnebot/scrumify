import {BaseModel} from './baseModel';
export class Project extends BaseModel {
    name: string;
    vision: string;
    defDone?: string;
    sprintDuration?: number;
    storyPointsPerSprint: number;
    users?: string[];
    backlogitems?: string[];
}