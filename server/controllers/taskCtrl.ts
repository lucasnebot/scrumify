import baseDAO from './baseDAO';
import {taskModel} from '../models/task';

export default class TaskCtrl extends baseDAO {
    model = taskModel;
}
