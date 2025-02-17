import { async } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { Model  } from 'mongoose';
import {Request, Response} from 'express';


export default abstract class BaseDAO {
  abstract model: Model<any>;

  // ! ❗ Use Arrow functions for correct binding of 'this'!

  /**
   * Creates a document of a model and inserts it into the DB
   */
  create = (req, res): void => {
    // Builds model with received data object
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

  /**
   * Returns the document to a given ID
   */
  read = (req, res): void => {
    this.model
      .findById(req.params.id)
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  /**
   * Returns all the documents from a specific Collection
   */
  readAll = (req, res): void => {
    const queryOps = req.query.queryOps ? JSON.parse(req.query.queryOps) : {};
    this.model
      .find(queryOps)
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  /**
   * Finds a document by ID and updates the given properties
   */
  update = (req: Request, res: Response): void => {
    let queryObj: any = { $set: req.body };
    if (req.query.advancedQuery){
      queryObj = req.body
    }
      this.model
      .findByIdAndUpdate(req.params.id, queryObj, { new: true })
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  updateMany = (req,res): void => {
    this.model.update(req.body[0],
      req.body[1],{multi:true}).then((result) =>{
        console.log(result);
        res.status(200).send(result);
    }).catch(err => {
      res.status(400).send(err);
    })
  }


/**
 * Deletes a document with the given ID
 */
  delete = (req, res): void => {
    this.model
      .findByIdAndRemove(req.params.id)
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
