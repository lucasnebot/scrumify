import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as helmet from "helmet";
import * as path from "path";
import * as mongoose from "mongoose";
// Use Native ES6 Promise libary to use 'classic' Promise syntax
// cryptic syntax nessessary because of TS rules
require("mongoose").Promise = global.Promise;

// Models and Controllers
import MilestoneCtrl from "./controllers/milestoneCtrl";
import Milestone from "./models/milestone";

export default class Server {
  // Set app to Express application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  /**
   * Connects to MongoDB and sets up Express middleware
   */
  private config(): void {
    // Load .env in process variable
    dotenv.config({ path: ".env" });

    // MongoDB Connection
    const MONGO_URI: string =
      process.env.PROD_MONGODB || process.env.TEST_MONGODB;

    mongoose
      .connect(MONGO_URI, { useMongoClient: true })
      .then(() => {
        console.log("Successful connection to MongoDB");
      })
      .catch(err => {
        console.log("Connection to MongoDB refused: " + err);
      });

    // Express middleware
    this.app.use("/", express.static(path.join(__dirname, "../public")));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  /**
   * Set the server routes
   */
  private routes(): void {
    // Instantiate Controllers
    const milestoneCtrl = new MilestoneCtrl();
    
    // Insert application routes here

    // Milestone
    this.app.get("/milestone/:id",milestoneCtrl.read);
    this.app.get("/milestone",milestoneCtrl.readAll);
    this.app.post("/milestone", milestoneCtrl.create);
    this.app.put("/milestone/:id", milestoneCtrl.update);
    this.app.delete("/milestone/:id", milestoneCtrl.delete);
  
  }
}
