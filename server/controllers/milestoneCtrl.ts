import baseDAO from './baseDAO';
import milestone from '../models/milestone';

export default class MilestoneCtrl extends baseDAO {
  model = milestone;
}
