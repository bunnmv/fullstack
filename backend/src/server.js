const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');

//middleware to enable CORS. Allow other domains to make requests
app.use(cors());

const path = require('path');

// const server = require('http').Server(app);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(require("./routes"));

// For future front-end static files
// Build files from React.js
// app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// server.listen(process.env.SERVER_PORT || 4000);


const server = http.createServer(app).listen(process.env.SERVER_PORT || 4000, function (e) {
    console.log(`● WEB SERVER STARTED on port 4000`);
});

server.on('error', (e) => {
    console.log('SERVER ERROR', e);
});