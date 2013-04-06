var _ = require('lodash');

module.exports = function (app, passport, auth) {

  // todo routes
  var todos = require('./../controllers/todos')
  app.get('/todos', todos.index)
  //app.get('/todos/new', auth.requiresLogin, todos.new)
  app.post('/todos', todos.create)
  //app.get('/todos/:id', todos.show)
  //app.get('/todos/:id/edit', auth.requiresLogin, auth.todo.hasAuthorization, todos.edit)
  app.put('/todos/:id', todos.update)
  app.del('/todos/:id', todos.destroy)

  app.param('id', todos.todo)

}