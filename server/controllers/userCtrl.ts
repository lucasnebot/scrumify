import baseDAO from './baseDAO';
import {userModel} from '../models/user';

export default class UserCtrl extends baseDAO {
    model = userModel;
}
