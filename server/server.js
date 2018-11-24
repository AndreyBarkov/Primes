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


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);