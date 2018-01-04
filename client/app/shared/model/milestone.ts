import {BaseModel} from './baseModel';
export class Milestone extends BaseModel{
    title: string;
    description: string;
    // Changed from date to string for easier two-way-databinding
    date: string;
    achieved?: Boolean;
} 