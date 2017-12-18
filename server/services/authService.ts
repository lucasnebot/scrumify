import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = 'jawollek';

export interface JWTClaimSet {
    name: string;
    email: string;
    role: number;
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

    /**
     * Encodes an JWT user token
     * @param user
     */
    encodeJWTToken(user: User) {
        return new Promise<string>((resolve, reject) => {
            const claimSet: JWTClaimSet = {
                name: user.name,
                email: user.email,
                role: user.role
            };
            jwt.sign(claimSet, JWT_SECRET, { algorithm: 'HS256'}, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
    },

    /**
     * Decodes an JWT token and returns the claim set
     * @param token
     */
    decodeJWTToken(token: string) {
        return new Promise<JWTClaimSet>((resolve, reject) => {
            jwt.verify(token || '', JWT_SECRET, (err, claimSet) => {
                err ? reject(err) : resolve(claimSet as JWTClaimSet);
            });
        });
    }
};

/**
 * Middleware to extract claims from JWT Token
 * @param req
 * @param res
 * @param next
 */
export function jwtClaimSetMiddleware(req: Request, res: Response, next: NextFunction) {
    authService.decodeJWTToken(req.cookies['jwt-token'])
    .then(claimSet => {
        res.locals.user = claimSet;
        next();
    })
    .catch(err => {
        next();
    });
}

/**
 * Authentication Middleware
 * Add this function on every route you want to protect from unauthorised access
 * @param req
 * @param res
 * @param next
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user) {
      next();
    } else {
      res.redirect('http://google.de');
    }
  }


