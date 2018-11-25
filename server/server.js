const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../client/build')));


app.use(bodyParser.json());
app.use(cors());

app.use('/', router);


module.exports = app;