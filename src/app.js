'use strict';

var express = require('express'),
    posts = require('./mock/posts.json');

var postLists = Object.keys(posts).map(function(value){
  return posts[value];
});

var app = express();

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.get('/', function(request, response){
  var path = request.path;
  response.locals.path = path;
  response.render('index');
});

app.get('/blog/:title?', function(request, response){
  var title = request.params.title;
  if (title === undefined) {
    response.status(503);
    response.render('blog', {posts: postLists});
  } else {
    var post = posts[title] || {};
    response.render('post', {post: post});
  }
});

app.get('/posts', function(request, response) {
  if (request.query.raw) {
    response.json(posts);
  }
  response.json(postLists);
});

app.listen(3000, function(){
  console.log('Server running is on port 3000!');
});

