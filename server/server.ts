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
var users = userService.getUsersById(1).then((res) => {
  console.log(res);
});
