const bodyParser = require('body-parser');
const db = require('../db');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let data = [];

module.exports = function (app) {
  app.get('/todo', (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    // console.log(req.body);
    db.add(req.body);
    data = [];
    db.findAll(data);
    res.json(data);
  });

  app.delete('/todo/:item', (req, res) => {
    db.remove(req.params.item);
    data = [];
    db.findAll(data);
    console.log(data);
    res.json(data);
  })
}  