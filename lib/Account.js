var Model = require('./Model');
var User = require('./User');

module.exports = Account;

function Account () {
  var AccountSchema = {
    user: User,
    accountNumber: Number,
    address: String,
    balance: Number
  };

  Model.call(this, AccountSchema);
  Model.extend(Account);
}