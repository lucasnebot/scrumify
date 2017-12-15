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
  };

  signIn = async (req, res: Response) => {
    try {
      // Find User by email
      const user = await this.model.findOne({
        email: req.body.email
      }) as User;
      if (!user) throw new Error('Invalid Email');
      // Validate password
      const validPassword = await authService.validatePassword(
        req.body.password,
        user.password
      );
      if (!validPassword) throw new Error('Invalid Password');
      // Create token and send back in header
      const token = await authService.encodeJWTToken(user);
      res.set('X-JWT', token).send({});

    } catch (error) {
      res.status(401).send(error);
    }
  };
}
