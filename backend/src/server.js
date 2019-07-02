const express = require('express');
const cors = require('cors');
const app = express();
//middleware to enable CORS. Allow other domains to make requests
app.use(cors());

const path = require('path');

const server = require('http').Server(app);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(require("./routes"));

// For future front-end static files
// Build files from React.js
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(3000);
