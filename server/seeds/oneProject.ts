
import * as faker from 'faker';
import * as conf from './index';

// Import mongoose models
import { userModel } from '../models/user';
import { taskModel } from '../models/task';
import { sprintModel } from '../models/sprint';
import { projectModel } from '../models/project';
import { milestoneModel } from '../models/milestone';
import { backlogItemModel } from '../models/backlogItem';

async function createTestData() {
    // Create users
    const users = [];
    const userIds = [];
    for (let i = 0; i < 2; i++) {
        const user = new userModel({
            email: faker.internet.email(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: await conf.hashPassword('123'),
            role: i
        });
        await user.save();
        userIds.push(user._id);
        console.log(JSON.stringify(user));
        users.push(user);
    }

    // Create some developers
    for (let i = 0; i < faker.random.number({min: 2, max: 5}); i++) {
        const user = new userModel({
            email: faker.internet.email(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: await conf.hashPassword('123'),
            role: 2
        });
        await user.save();
        userIds.push(user._id);
        console.log(JSON.stringify(user));
        users.push(user);
    }

    // Create project
    const project = new projectModel({
        name: faker.company.companyName(),
        vision: faker.lorem.sentences(1),
        defDone: faker.lorem.sentences(2),
        sprintDuration: faker.random.number(200),
        storyPointsPerSprint: 100,
        users: userIds
    });

    await project.save();
    console.log(JSON.stringify(project));

    // Create Backlog-Items
    const stati =  ['EPIC', 'RFE', 'RFS', 'SPRINT', 'DONE'];
    for (let i = 0; i < faker.random.number({min: 5, max: 20}); i++) {
        const backlogItem = new backlogItemModel({
            title: faker.lorem.word,
            description: faker.lorem.sentences(faker.random.number({min: 1, max: 2})),
            order: i,
            estimation: 0,
            status: stati[faker.random.number({min: 0, max: 1})],
            project: project._id
        });
        await backlogItem.save();
        console.log(JSON.stringify(backlogItem));
    }
}

async function seed() {
    await conf.dropDatabase();
    await conf.connectDatabase();
    await createTestData();
    process.exit(0);
}

seed();
