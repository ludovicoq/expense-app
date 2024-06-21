import * as dotenv from 'dotenv';
import path from "path"
dotenv.config({ path: path.join(__dirname, '.env') });

import express, { Express } from "express";
import cors from "cors"
import http from "http"
import router from "./app/routes/app-routes"
import { DatabaseService } from "./app/core/services/db-service";
import { AppConfiguration } from './app/core/models/config';
import { UserService } from './app/core/services/user-service';
import { User } from './app/core/models/user';

const app: Express = express();
const port: number = 3001;
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/expense-app/browser')));

/* ----------------- A P I  R O U T E S ----------------- */
app.use(router);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/expense-app/browser/index.html')));

const server = http.createServer(app);
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
var userService = new UserService();
var users = userService.getUserById(1).then((res) => {
  //console.log(res);
});
var user = {
  //userId: 1,
  surname: 'Changed',
  name: 'Ludo',
  email: 'changed@dev.com',
  password: 'pass',
  userRef: 'reference',
  username: 'usernameLudo',
  dateCreate: new Date(),
  dateChange: new Date()
} as User;
// var setUser = userService.setUser(user).then((res) => {
//   console.log(res);
// });
userService.addUser(user).then((res) => {
  user = res;
  var deletedUser = userService.deleteUserById(user.userId).then((res) => {
    console.log('Deleted: ', res);
  });
});

