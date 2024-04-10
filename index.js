var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs'); // need for writing log to a file
var bodyParser = require('body-parser') // need to parse http reqest
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
  console.log('Webpgage opened. Returning index.html ...')
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.post('/add', function(req){
  const fname = req.body.fname; // parse first name from http request
  const lname = req.body.lname; // parse last name from http request

  const txt =  'POST /add method recieved: ' + [fname, lname];

  console.log(txt);
  
  fs.appendFile('log.txt', txt + '\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

server.listen(8080);



