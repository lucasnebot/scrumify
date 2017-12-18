import baseDAO from './baseDAO';
import {backlogItemModel} from '../models/backlogItem';
import * as mongoose from 'mongoose';

export default class BacklogItemCtrl extends baseDAO {
     model = backlogItemModel;
}
