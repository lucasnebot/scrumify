import baseDAO from './baseDAO';
import {backlogItemModel} from '../models/backlogItem';
import * as mongoose from 'mongoose';

export default class BacklogItemCtrl extends baseDAO {
     model = backlogItemModel;

     updateOrder = (req,res) : void => {
        var updates = [];
        console.log(req.body)
        req.body.forEach((element,index) => {
           var updatePromise = this.model.update({"_id": element}, {"$set": {"order": index }});
           updates.push(updatePromise);
        });
    
        Promise.all(updates).then((result) => {
          console.log(result)
          res.status(204).send();
        })
        .catch((error) => {
          
        })
        
      }
}
