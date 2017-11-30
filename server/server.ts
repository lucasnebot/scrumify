import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as path from 'path';


export default class Server {
    // Set app to Express application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    /**
     * Inherits the application config
     */
    public config(): void {
        // Load .env in process variable
        dotenv.load({ path: '.env' });

        // MongoDB Connection
        const MONGO_URI: string = process.env.PROD_MONGODB || process.env.TEST_MONGODB;

        mongoose.connect(MONGO_URI, { useMongoClient: true }, (err) => {
            if (err) {
                console.log('Connection to MongoDB refused: ' + err);
            } else {
                console.log('Successful connection to MongoDB');
            }
        });

        // Express middleware
        this.app.use('/', express.static(path.join(__dirname, '../public')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(helmet());
    }
}
