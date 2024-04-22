const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'dist' folder (adjust the path)
app.use(express.static(path.join(__dirname, '../dist/expense-app/browser')));

// Include your API routes
app.use(require('./app/routes/app-routes'));

// Handle all other routes and serve the index.html file (adjust the path)
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/expense-app/browser/index.html')));

const server = http.createServer(app);
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
