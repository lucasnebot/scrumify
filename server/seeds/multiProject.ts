/**
 * Script to seed the Scrumify project with some example data
 */
import { async } from 'rxjs/scheduler/async';

 // Import required libraries
 import * as bcrypt from 'bcryptjs';
 import * as mongoose from 'mongoose';
 import * as mongodb from 'mongodb';
 import * as faker from 'faker';
 import * as dotenv from 'dotenv';

 // Import mongoose models
 import { userModel } from '../models/user';
 import { taskModel } from '../models/task';
 import { sprintModel } from '../models/sprint';
 import { projectModel } from '../models/project';
 import { milestoneModel } from '../models/milestone';
 import { backlogItemModel } from '../models/backlogItem';


 const TEST_MONGODB = 'mongodb://localhost:27017/scrumify';

// Connect to MongoDB
async function connectDatabase() {
    mongoose
    .connect(TEST_MONGODB, { useMongoClient: true })
    .then(() => {
      console.log('Successful connection to ' + TEST_MONGODB);
    })
    .catch(err => {
      console.log('Connection to MongoDB refused: ' + err);
    });
}

// Drop scrumify database
async function dropDatabase() {
    console.log('Drop database scrumify...');
    try {
        await connectDatabase();
        await mongoose.connection.dropDatabase();
        console.log('Database dropped!');
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}


// Hashes a string with BCrypt
async function hashPassword(password: string) {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash);
        });
    });
}


async function seedDatabase() {
        // Create users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new userModel({
                email: faker.internet.email(),
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                password: await hashPassword('123'),
                role: faker.random.number({min: 0, max: 2})
            });
            await user.save();
            users.push(user);
            console.log(JSON.stringify(user));
        }

        // Create projects
        const projects = [];
        for (let i = 0; i < 3; i++) {
            const project = new projectModel({
                name: faker.company.companyName(),
                vision: faker.lorem.sentences(1),
                defDone: faker.lorem.sentences(2),
                sprintDuration: faker.random.number(200),
                storyPointsPerSprint: faker.random.number(5)
            });
            await project.save();
            projects.push(project);
            console.log(JSON.stringify(project));
        }

        // Create backlogItems
        const backlogItems = [];
        const stati = ['EPIC', 'RFE', 'RFS', 'SPRINT', 'DONE'];
        for (let i = 1; i < 31; i++) {
            const backlogItem = new backlogItemModel({
                title: faker.lorem.sentence(),
                description: faker.lorem.sentences(2),
                order: i,
                estimation: faker.random.number({min: 1, max: 30}),
                status: stati[faker.random.number({min: 0, max: 4})],
                project: projects[faker.random.number({min: 0, max: projects.length - 1})]._id
            });
            await backlogItem.save();
            backlogItems.push(backlogItem);
            console.log(JSON.stringify(backlogItem));
        }
}

async function blubbel() {
    await dropDatabase();
    await connectDatabase();
    await seedDatabase();
    process.exit(0);
}

blubbel();
