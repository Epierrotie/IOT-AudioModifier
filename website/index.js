// index.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app      = express();
var port     = process.env.PORT || 8080;

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./routes/routes.js')(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
