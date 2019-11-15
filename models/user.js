const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  fullName: String,
  userImg: String,
  userEmail: String,
  firstName: String,
  lastName: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
