var express = require('express');
var app = express();
//var redis = require("redis");

// Add your cache name and access key.
//var client = redis.createClient(6379,'iacredis.redis.cache.windows.net', {auth_pass: 'o5f1Taf2OjBQFJJASkLk5UCIjp0rBtoIDDYz6300fBY=' });

//client.set("foo", "bar", function(err, reply) {
//    console.log(reply);
//});

//client.get("foo",  function(err, reply) {
 //   console.log(reply);
//});

app.use('/', express.static(__dirname + '/public'));
app.listen(4000,function(){
    console.log('Example app listening at http:')});
