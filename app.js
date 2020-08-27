const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const todoController = require('./controllers/todoController');

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('./public'))

todoController(app);

app.listen(port, () => console.log(`Example app listening on port port!`))