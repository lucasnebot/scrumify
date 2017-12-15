import {BaseModel} from './index';

export class BacklogItem extends BaseModel {
 title: string;
 description : string;
 order: number;
}
