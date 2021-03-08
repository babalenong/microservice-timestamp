// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp API
function dateToUnix(req){
  return parseInt((new Date(req).getTime() / 1000).toFixed(0));
}

function unixToDate(unix){
  let date = new Date(unix * 1000);
  return date.toUTCString()
}

function timestamp(req){
  var unix;

  if (req.includes("-")){
    unix = dateToUnix(req);
  } else {
    unix = req
  }

  let result = {
    'unix': unix,
    'utc': unixToDate(unix)
  };

  return result;
}

app.get("/api/timestamp/:time", function (req, res){
  res.json(timestamp(req.params.time));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
