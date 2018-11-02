var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Users', UserSchema)
