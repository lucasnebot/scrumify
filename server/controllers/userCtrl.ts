import baseDAO from './baseDAO';
import { userModel, User } from '../models/user';
import { authService } from '../services/authService';
import { Response } from 'express';

export default class UserCtrl extends baseDAO {
  model = userModel;

  signUp = (req, res): void => {
    authService.hashPassword(req.body.password).then(hash => {
      req.body.password = hash;
      this.create(req, res);
    });
  }

  signIn = async (req, res: Response) => {
    try {
      // Find User by email
      const user = await this.model.findOne({email : req.body.email});

      if (!user) {
        throw new Error('Invalid Email');
      }

      // Validate password
      const validatePassword = await authService.validatePassword(req.body.password, user.password);
      
      if (!validatePassword) {
        throw new Error('Invalid Password');
      }

      const token = await authService.encodeJWTToken(user);
      // Send User Data with response
      res.set('X-JWT', token).send(user);

    } catch (error) {
      res.status(401).send(error);
    }
  }
}
