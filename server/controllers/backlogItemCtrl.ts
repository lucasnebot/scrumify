import { userStoryModel } from './../models/backlogItem';
import baseDAO from './baseDAO';
import {backlogItemModel} from '../models/backlogItem';

export default class BacklogItemCtrl extends baseDAO {
    model = backlogItemModel;
}
