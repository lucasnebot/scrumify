import {BaseModel} from './'

export class BacklogItem extends BaseModel{
 title: string;
 description : string;
 order: number;
}