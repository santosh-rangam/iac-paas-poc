var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hellow World');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
//var redis = require("redis");

// Add your cache name and access key.
//var client = redis.createClient(6379,'iacredis.redis.cache.windows.net', {auth_pass: 'o5f1Taf2OjBQFJJASkLk5UCIjp0rBtoIDDYz6300fBY=' });

//client.set("foo", "bar", function(err, reply) {
 //   console.log(reply);
//});

//client.get("foo",  function(err, reply) {
  //  console.log(reply);
//});
