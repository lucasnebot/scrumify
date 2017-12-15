import {BaseModel} from './'

export interface SignInData {
    email: string;
    password: string;
  }

export class User extends BaseModel{
    name: string;
    surname: string;
    email: string;
    password: string;
    role: number;
}