 // Import required libraries
 import * as bcrypt from 'bcryptjs';
 import * as mongoose from 'mongoose';
 import * as dotenv from 'dotenv';

// Connect to MongoDB
export async function connectDatabase() {

    dotenv.config({ path: '.env' });

    // MongoDB Connection
    const MONGO_URI: string =
      process.env.PROD_MONGODB || process.env.TEST_MONGODB;

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
        await mongoose.connection.useDb('scrumify')
        console.log('Database dropped!');
        await mongoose.disconnect();
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
