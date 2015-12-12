var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(methodOverride());


var Todo = mongoose.model('Todo', {
  text: String
});


//routes

/*
	Get todos
 */
app.get('/api/todos', function(req, res) {

  Todo.find(function(err, todos) {

    if (err)
      res.send(err);

    res.json(todos);
  });

});

/*
	Create todo
 */
app.post('/api/todos', function(req, res) {

  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err)
      res.send(err);


    Todo.find(function(err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });

  });

});

/*
	Delete todo
 */
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});


// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");