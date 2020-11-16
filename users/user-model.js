const db = require("../data/db-config");

module.exports = {
  find,
  findBy,
  add,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function add(user) {
  return db("users").insert(user);
}
