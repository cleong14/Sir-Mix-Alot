var store = require('./DataStore').store;
var extend = require('./extend');

module.exports = Model;

function Model (schema) {
  this.schema = schema;
  this.id = null;
  
  for (var k in schema) {
    this[k] = null;
  }

  store[this.constructor.name] = store[this.constructor.name] || [];
}

Model.prototype.save = function () {
  // all ids start as null so this will always run
  // saves id by using getNextId
  // pushes getNextId() onto array
  if (this.id === null) {
    this.id = this.constructor.getNextId();
  }
  store[this.constructor.name].push(this);
};

Model.prototype.destroy = function () {
  // object of the current id
  var toDestroy = this.constructor.find(this.id);

  // current index of what were trying to destroy
  var destroyIndex = store[this.constructor.name].indexOf(toDestroy);

  // if it is in the array
  if (destroyIndex > -1) {
    // splice/remove from the array
    store[this.constructor.name].splice(0, 1);
  }
};

Model.getNextId = function () {
  // init nextId at 0
  var nextId = 0;
  // if empty array
  if (store[this.name].length === 0) {
    nextId = 1;
    return nextId;
  }
  // if array contains values
  for (var i = 0; i < store[this.name].length; i++) {
    // if current indexes id is > nextId
    if (store[this.name][i].id > nextId) {
      // assign nextId to current indexes id
      nextId = store[this.name][i].id;
    }
  }
  // always want to return next id
  return nextId + 1;
};

Model.find = function (id) {
  for (var i = 0; i < store[this.name].length; i++) {
    // if current indexes id is the id you want
    if (store[this.name][i].id === id) {
      return store[this.name][i];
    }
  }
  return null;
};

Model.extend = function (klass) {
  // extends properties onto constructor itself
  for (var key in this) {
    if (!klass.hasOwnProperty(key)) {
      klass[key] = this[key];
    }
  }

  // extends prototype properties onto objects prototypes properties
  for (var key2 in this.prototype) {
    if (!klass.prototype.hasOwnProperty(key2)) {
      klass.prototype[key2] = this.prototype[key2];
    }
  }
  // return final extended Class
  return klass;
};