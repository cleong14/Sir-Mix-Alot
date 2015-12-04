var Model = require('./Model');
var User = require('./User');

module.exports = Message;

function Message () {
  var MessageSchema = {
    from: User,
    to: User,
    message: String,
    sent: Date
  };

  Model.call(this, MessageSchema);
  Model.extend(Message);
}