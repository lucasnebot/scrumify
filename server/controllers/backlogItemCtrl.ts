import baseDAO from './baseDAO';
import {backlogItemModel} from '../models/backlogItem';
import * as mongoose from 'mongoose';

export default class BacklogItemCtrl extends baseDAO {
     model = backlogItemModel;

     updateOrder = (req,res) : void => {
        var updates = [];
        req.body.forEach((element,index) => {
           var updatePromise = this.model.update({"_id": element}, {"$set": {"order": index }});
           updates.push(updatePromise);
        });
    
        Promise.all(updates).then((result) => {
          res.status(204).send();
        })
        .catch((error) => {
          res.status(400).send(error);
        })
        
      }
}
