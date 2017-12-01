import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as User from '../models/user';
import * as mongoose from 'mongoose';

const JWT_SECRET = 'jawollek';

export interface JWTClaimSet {
    id: string;
    name: string;
    email: string;
    role: string;
}

/**
 * Service to encode, decode JWT and hash, validate passwords
 */
export const authService = {
    hashPassword(password: string) {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                err ? reject(err) : resolve(hash);
            });
        });
    }
};

