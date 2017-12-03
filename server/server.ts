import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { jwtClaimSetMiddleware, authMiddleware} from './services/auth.service';

// Use Native ES6 Promise libary to use 'classic' Promise syntax
// cryptic syntax nessessary because of TS rules
require('mongoose').Promise = global.Promise;

// Controllers
import baseDAO from 'controllers/baseDAO';
import MilestoneCtrl from './controllers/milestoneCtrl';
import BacklogItemCtrl from './controllers/backlogItemCtrl';
import TaskCtrl from './controllers/taskCtrl';
import SprintCtrl from './controllers/sprintCtrl';


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
    dotenv.config({ path: '.env' });

    // MongoDB Connection
    const MONGO_URI: string =
      process.env.PROD_MONGODB || process.env.TEST_MONGODB;

    mongoose
      .connect(MONGO_URI, { useMongoClient: true })
      .then(() => {
        console.log('Successful connection to MongoDB');
      })
      .catch(err => {
        console.log('Connection to MongoDB refused: ' + err);
      });

    // Express middleware
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(jwtClaimSetMiddleware);
  }

  /**
   * Set the server routes
   */
  private routes(): void {
    // Instantiate Controllers
    const milestoneCtrl = new MilestoneCtrl();
    const backlogItemCtrl = new BacklogItemCtrl();
    const taskCtrl = new TaskCtrl();
    const sprintCtrl = new SprintCtrl();

    // Insert application routes here
    this.setCrudRoutes('milestone', milestoneCtrl);
    this.setCrudRoutes('backlogItem', backlogItemCtrl);
    this.setCrudRoutes('task', taskCtrl);
    this.setCrudRoutes('sprint', sprintCtrl);
  }
  /**
   * Opens all crud routes for a model and connects to controller
   * --> url/api/model/(:id)
   */
  private setCrudRoutes(path: string, ctrl: baseDAO) {
    this.app.get(`/api/${path}/:id`, authMiddleware, ctrl.read);
    this.app.get(`/api/${path}`, ctrl.readAll);
    this.app.post(`/api/${path}`, ctrl.create);
    this.app.put(`/api/${path}/:id`, ctrl.update);
    this.app.delete(`/api/${path}/:id`, ctrl.delete);
  }
}
