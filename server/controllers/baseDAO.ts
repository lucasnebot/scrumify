abstract class baseDAO {
  abstract model: any;
  
  //! ❗ Use Arrow functions for correct binding of 'this'!

  /**
   * Creates a document of a model and inserts it into the DB
   * @param req
   * @param res
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
  };
  /**
   * Returns all the documents from a specific Collection
   * @param req
   * @param res
   */
  readAll = (req, res): void => {
    this.model
      .find({})
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  };
}
export default baseDAO;
