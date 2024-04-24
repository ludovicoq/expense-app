import express, { Express } from "express";
import cors from "cors"
import path from "path"
import http from "http"
import router from "./app/routes/app-routes"

const app: Express = express();
const port: number = 3001;

app.use(cors()); 

app.use(express.static(path.join(__dirname, '../dist/expense-app/browser')));


/* ----------------- A P I  R O U T E S ----------------- */
app.use(router);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/expense-app/browser/index.html')));

const server = http.createServer(app);
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
