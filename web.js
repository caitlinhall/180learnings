var path = require('path');
var express = require('express');

var app = express();
app.use(express.logger());

// serve up files in the 'public' folder as static content
// these files are basically the client-side 'app'
app.use(express.static(path.join(__dirname, 'public')));

// start listening for web requests, by default on port 5001
var port = process.env.PORT || 5001;
app.listen(port, function() {
    console.log("Listening on " + port);
});