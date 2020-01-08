const mongoose = require('mongoose');
const { Schema } = mongoose;

const houseSchema = new Schema({
  street: String,
  city: String,
  provstate: String,
  zipcode: Number,
  postalcode: String,
  country: String,
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  lotsize: Number,
  zillowurl: String,
  realtorurl: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('house', houseSchema);
