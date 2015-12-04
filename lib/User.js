var Model = require('./Model');
var store = require('./DataStore').store;

module.exports = User;

function User () {
  var UserSchema = {
    username: String,
    password: String
  };

  Model.call(this, UserSchema);
  Model.extend(User);
}
