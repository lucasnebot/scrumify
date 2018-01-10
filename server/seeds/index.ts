 // Import required libraries
 import * as bcrypt from 'bcryptjs';
 import * as mongoose from 'mongoose';
 import * as dotenv from 'dotenv';
 import * as mongodb from 'mongodb';

// Fix mongoose promise library
(<any>mongoose).Promise = global.Promise;

// Load .env in process variable
dotenv.config({ path: '.env' });

// MongoDB Connection
const MONGO_URI: string =
    process.env.PROD_MONGODB || process.env.TEST_MONGODB;

// Connect to MongoDB
export async function connectDatabase() {
    mongoose
    .connect(MONGO_URI, { useMongoClient: true })
    .then(() => {
      console.log('Successful connection to ' + MONGO_URI);
    })
    .catch(err => {
      console.log('Connection to MongoDB refused: ' + err);
    });
}

// Drop scrumify database
export async function dropDatabase() {
    console.log('Drop database scrumify...');
    try {
        const db = await mongodb.connect(MONGO_URI);
        await db.listCollections().toArray((error, collection) => {
            collection.forEach(col => {
                console.log('Drop collection: ' + col['name']);
                db.collection(col['name']).drop();
            });
            console.log('Database dropped!');
        });
    } catch (err) {
        console.error(err);
    }
}

// Hashes a string with BCrypt
export async function hashPassword(password: string) {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash);
        });
    });
}
