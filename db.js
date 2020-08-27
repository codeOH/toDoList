var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.run("CREATE TABLE todos (info TEXT)");

function add(data) {
  db.serialize(function () {

    var stmt = db.prepare("INSERT INTO todos VALUES (?)");
    stmt.run(data.item);
  });
}

function remove(data) {
  db.serialize(function () {
    var stmt = db.prepare("DELETE FROM todos WHERE info = ?");
    stmt.run(data, (err) => {
      if (err) console.log(err);
    });
  });
}

function modify(data) {

}

function find(data) {

}

function findAll(data) {
  db.serialize(function () {

    var stmt = db.prepare("SELECT rowid AS id, info FROM todos");
    stmt.each((err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      data.push({ item: row.info });
    });
  });
}

function close() {
  db.close();
}

module.exports = {
  add: add,
  remove: remove,
  modify: modify,
  find: find,
  findAll: findAll,
  close: close,
}