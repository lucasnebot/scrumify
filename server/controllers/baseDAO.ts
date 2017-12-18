import { HttpHeaders } from '@angular/common/http';
import { Model } from 'mongoose';

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
    this.model
      .find(req.query)
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
  update = (req, res): void => {
    this.model
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
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
