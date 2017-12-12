import baseDAO from './baseDAO';
import {milestoneModel} from '../models/milestone';

export default class MilestoneCtrl extends baseDAO {
  model = milestoneModel;
}
