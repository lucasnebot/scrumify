import {BaseModel} from './'


export class User extends BaseModel{
    name: string;
    surname: string;
    email: string;
    password: string;
    role: number;
}