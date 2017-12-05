import { model, Schema} from 'mongoose';

export interface User {
    email: string;
    name: string;
    surname: string;
    password: string;
}

export enum UserRole {
    scrumMaster = 1,
    productOwner,
    developer
}

export const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: UserRole,
        required: true
    }
});

export const userModel = model('User', userSchema);
