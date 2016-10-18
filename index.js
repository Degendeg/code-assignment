var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

app.get('/play', function(req, res) {
  var arr = [];
  for (i = 0; i < 3; i++) {
    var r = Math.floor(Math.random() * 5) + 1;
    arr.push(r);
  }
  var b = Math.floor(Math.random() * 15) + 1;
  // Bonus triggered
  if (b == 9) {
    arr.push(b);
    res.send(JSON.stringify(arr));
  } 
  else {
    res.send(JSON.stringify(arr));
  }
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});