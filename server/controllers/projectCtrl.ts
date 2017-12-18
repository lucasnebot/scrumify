import baseDAO from './baseDAO';
import {projectModel} from '../models/project';

export default class ProjectCtrl extends baseDAO {
  model = projectModel;
}