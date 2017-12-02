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
import baseDAO from "controllers/baseDAO";
import MilestoneCtrl from "./controllers/milestoneCtrl";
import Milestone from "./models/milestone";
import BacklogItemCtrl from "./controllers/backlogItemCtrl";
import BacklogItem from "./models/backLogItem";
import TaskCtrl from "./controllers/taskCtrl";
import Task from "./models/task";

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
    const backlogItemCtrl = new BacklogItemCtrl();
    const taskCtrl = new TaskCtrl();

    // Insert application routes here
    this.setCrudRoutes("milestone", milestoneCtrl);
    this.setCrudRoutes("backlogItem", backlogItemCtrl);
    this.setCrudRoutes("task", taskCtrl);
  }

  private setCrudRoutes(path: string, ctrl: baseDAO) {
    this.app.get(`/api/${path}/:id`, ctrl.read);
    this.app.get(`/api/${path}`, ctrl.readAll);
    this.app.post(`/api/${path}`, ctrl.create);
    this.app.put(`/api/${path}/:id`, ctrl.update);
    this.app.delete(`/api/${path}/:id`, ctrl.delete);
  }
}
