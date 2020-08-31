const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:<1234>@cluster0.jyfiz.mongodb.net/<toDoList>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });  

const todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);