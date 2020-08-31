const bodyParser = require('body-parser');
const db = require('../db');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:1234@cluster0.jyfiz.mongodb.net/toDoList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });  

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);
// let data = [];

module.exports = function (app) {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    // db.remove(req.params.item);
    // data = [];
    // db.findAll(data);
    // console.log(data);
    // res.json(data);
    Todo.find({item: req.params.item.replace(/-/g, " ")}).deleteOne(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}  