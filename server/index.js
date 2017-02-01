var express = require('express');
var app = express();

app.use(express.static('static'))

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var file = require('./static/mock.json')
    res.send(file);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});