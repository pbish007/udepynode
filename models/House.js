const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: String,
    isDefault: Boolean
})

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
      images: [ImageSchema]
  },
  {
    id: false,
    _id: false
  }
);

const financialsSchema = new Schema(
  {
    assetValue: Number,
    mortgage: Number,
    mortgagePayment: Number,
    interest: Number,
    mortgageCompany: String,
    mortgageCompanyPhone: Number,
    paymentFrequency: { type: String, default: "" }
  },
  {
    id: false,
    _id: false
  }
);

const insuranceSchema = new Schema(
  {
    cost: Number,
    company: String,
    companyPhone: Number,
    broker: String
  },
  {
    id: false,
    _id: false
  }
);

const utilitiesSchema = new Schema(
  {
    utilityType: String,
    companyName: String,
    account: String,
    monthlyCost: Number,
    supportNumber: Number
  },
  {
    id: true,
    _id: true
  }
);

const supportSchema = new Schema(
  {
    supportType: String,
    personName: String,
    companyName: String,
    phoneNumber: Number,
    mobile: Number
  },
  {
    id: true,
    _id: true
  }
);

const houseSchema = new Schema(
  {
    userId: mongoose.Types.ObjectId,
    address: addressSchema,
    financials: financialsSchema,
    insurance: insuranceSchema,
    utilities: [utilitiesSchema],
    support: [supportSchema]
  },
  {
    timestamps: true
  }
);

module.exports = {
  House: mongoose.model("house", houseSchema)
};
