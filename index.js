const path = require('path');
const express = require('express');
const app = express();

var posts = require('./routes/posts.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/posts', posts);

app.get('/',(req, res)=>{
    res.render('index');
})

app.listen(3000);