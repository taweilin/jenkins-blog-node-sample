var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  models.Post
    .findAll()
    .then(function (posts) {
      res.render('posts/index', {
        posts: posts
      });
    });
});

router.get('/create', function (req, res) {
  res.render('posts/create');
});

router.post('/create', function (req, res) {
  models.Post.create({
    title: req.body.title,
    content: req.body.content
  }).then(function () {
    res.redirect('/posts');
  });
});

module.exports = router;
