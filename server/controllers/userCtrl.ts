import baseDAO from './baseDAO';
import {userModel} from '../models/user';
import {authService} from '../services/authService';

export default class UserCtrl extends baseDAO {
    model = userModel;

    signUp = (req, res): void => {
        authService.hashPassword(req.body.password).then((hash) => {
            req.body.password = hash;
            this.create(req,res);
        })
    }
}
