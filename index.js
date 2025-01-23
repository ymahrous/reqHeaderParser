// index.js
// where your node app starts

require('dotenv').config();
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// -------------------
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.ip || req.connection.remoteAddress;
  const language = req.headers['accept-language'].split(',')[0];
  const software = req.headers['user-agent'];
  
  res.json({
    ipaddress,
    language,
    software: software.split(')')[0] + ')',
  });
});
// -------------------

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
