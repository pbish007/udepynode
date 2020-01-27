const mongoose = require('mongoose');
const { Schema } = mongoose;

const udetailSchema = new Schema({
  userStreet: String,
  userCity: String,
  userZipPostal: String,
  userState: String,
  userCountry: String,
  userCell: Number,
  userPhone: Number,
  userLinkedin: String,
  userEmailsendyes: {type: Boolean, default: false},
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('udetails', udetailSchema);
