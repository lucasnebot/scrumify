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
    /**
     * Hashes a clear password with bcrypt
     * @param password
     */
    hashPassword(password: string) {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                err ? reject(err) : resolve(hash);
            });
        });
    },

    /**
     * Validates a password against a bcrypt hash
     * @param password
     * @param hash
     */
    validatePassword(password: string, hash: string) {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, hash, (err, valid) => {
                err ? reject(err) : resolve(valid);
            });
        });
    },
};

