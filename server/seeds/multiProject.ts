/**
 * Script to seed the Scrumify project with some example data
 */

 import * as faker from 'faker';
 import * as conf from './index';

 // Import mongoose models
 import { userModel } from '../models/user';
 import { taskModel } from '../models/task';
 import { sprintModel } from '../models/sprint';
 import { projectModel } from '../models/project';
 import { milestoneModel } from '../models/milestone';
 import { backlogItemModel } from '../models/backlogItem';

async function seedDatabase() {
        // Create users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new userModel({
                email: faker.internet.email(),
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                password: await conf.hashPassword('123'),
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
    await conf.dropDatabase();
    await conf.connectDatabase();
    await seedDatabase();
    process.exit(0);
}

blubbel();
