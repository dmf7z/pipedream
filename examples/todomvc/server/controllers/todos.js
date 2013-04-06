var _ = require('lodash');
var db = require('../db/db');

/**
 * Find todo by id
 */


exports.todo = function(req, res, next, id){
  req.todoId = id;
  next()
}

/**
 * New todo
 */

exports.new = function(req, res){
  /*res.render('todos/new', {
    title: 'New Todo',
    todo: new Todo({})
  })*/
}

/**
 * Create an todo
 */

exports.create = function (req, res) {
  var todo = req.body;
  todo.id = db.add(todo);
  res.send(todo);
}

/**
 * Edit an todo
 */

exports.edit = function (req, res) {
  var todo = req.body;
  db.data[req.todoId] = todo;
  res.send(todo);
}

/**
 * Update todo
 */

exports.update = function(req, res){
 var todo = req.body;
  db.data[req.todoId] = todo;
  res.send(todo);
}

/**
 * View an todo
 */

exports.show = function(req, res){
 /* res.render('todos/show', {
    title: req.todo.title,
    todo: req.todo
  })*/
}

/**
 * Delete an todo
 */

exports.destroy = function(req, res){
  db.del(req.todoId);
  res.send(req.todoId)  
}

/**
 * List of Todos
 */

exports.index = function(req, res){
  for (var key in db.data) {
      db.data[key].id = key;
  }
  res.json(_.values(db.data));
}