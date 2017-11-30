# Scrumify

A tool to manage your next idea with agile SCRUM.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4. The backend API is made from scratch.

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 5](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`
4. Edit `.env` and replace the MongoDB URI with your local remote MongoDB server

## Run
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

## Deploy (Heroku)
To deploy on Heroku you have to do the following steps:
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
3. `heroku login`
4. Create new app `heroku create`
5. Add mlab Addon for MongoDB
6. `mkdir your-app-name && cd your-app-name`
7. `git init`
8. `heroku git:remote -a your-app-name`
9. Download this repo and copy all files into `your-app-name` folder
10. `npm i`
11. `git add .`
12. `git commit -m "Going to Heroku"`
13. `git push heroku master`
14. `heroku open` and a window will open with your app online