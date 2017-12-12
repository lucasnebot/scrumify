import { userStoryModel } from './../models/backlogItem';
import baseDAO from './baseDAO';
import {backlogItemModel, userStoryModel} from '../models/backlogItem';
import * as mongoose from 'mongoose';

export default class BacklogItemCtrl extends baseDAO {
     model = backlogItemModel;

     /**
      * Overrides the default create route
      */
     create = (req, res): void => {
        // Builds model with received data object
        const modelType: string = req.body.type;
        modelType ? this.model = mongoose.model(modelType) : this.model = backlogItemModel;

        const obj = new this.model(req.body);
        // Save into DB
        obj
          .save()
          .then(doc => {
            res.send(doc);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      }
}
