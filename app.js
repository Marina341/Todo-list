var express = require('express');
var path =require('path');
var todoController = require('./todoController');

var app = express();

app.set('view engine', 'ejs');
// app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

todoController(app);

app.listen(3000);
console.log('Connected at localhost:3000');