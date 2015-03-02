var path = require('path');
var express = require('express');
var Twitter = require('twitter');
var app = express();
app.use(express.logger());

// serve up files in the 'public' folder as static content
// these files are basically the client-side 'app'
app.use(express.static(path.join(__dirname, 'public')));

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.get('search/tweets', {q: '%23coding', result_type: 'popular'}, function(error, tweets, response){
  //console.log(error);
  if(error) throw error;
  //console.log(tweets.statuses[0].text);  // The favorites. 
  //console.log(response);  // Raw response object. 
  var arrayLength = tweets.statuses.length;
  var tweetsArray = [];
  for(var i = 0; i <arrayLength; i++){
    tweetsArray.push(tweets.statuses[i].text)
  }
  console.log(tweetsArray);

  app.get('/twitter', function (req, res, next) {
    res.send(JSON.stringify(tweetsArray));
  });
});

// start listening for web requests, by default on port 5001
var port = process.env.PORT || 5001;
app.listen(port, function() {
    console.log("Listening on " + port);
});