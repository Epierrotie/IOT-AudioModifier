// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;

app.set('view engine', 'ejs'); // set up ejs for templating


// routes ======================================================================
require('./routes/routes.js')(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
