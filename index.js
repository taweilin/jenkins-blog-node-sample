const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

var posts = require('./routes/posts.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/posts', posts);

app.get('/', (req, res) => {
  res.render('index');
})

var server = app.listen(3000);

module.exports = server;
