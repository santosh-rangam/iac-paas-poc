//http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
 // res.end('Hello World\n');
//}).listen(2000);
//console.log('Server running at port 2000');




var http = require ('http');

var port = 9000;

http.createServer(function ( req,res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello there, world!\n');
}).listen(port);

console.log('Listening to port', port);

//nohup node index.js & 
//    
//npm install express
//
//var express = require('express');
//var app = express();
//
//app.get('/', function (req, res) {
//    res.send('Hello there, world!\n');
    