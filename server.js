// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// api endpoint with parameters
app.get("/api/timestamp/:date_string", function (req, res) {
  let input = req.params.date_string;
  if (isNaN(input) == false){
    input = Number(input);
  }
  let parsed_date = new Date(input);
  let timestamp = Date.parse(parsed_date);
  if (isNaN(timestamp) == false) {
    res.json({"unix":timestamp, "utc":parsed_date.toUTCString()});
  }
  else{
    res.json({"error":"Invalid Date"});
  }
});

// api endpoint with parameters
app.get("/api/timestamp/", function (req, res) {
   res.json({"unix":Date.parse(new Date()), "utc":(new Date()).toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});