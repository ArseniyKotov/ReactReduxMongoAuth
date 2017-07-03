const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router/router.js');
const cors = require('cors');
const path = require('path');

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || '3000';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(router);
app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, function () {
  console.log('listening right now on port', PORT);
});

module.exports.app = app;