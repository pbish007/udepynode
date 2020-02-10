const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  {
    id: false,
    _id: false
  }
);

const financialsSchema = new Schema(
  {
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
    companyName: String,
    account: String,
    monthlyCost: Number,
    supportNumber: Number
  },
  {
    id: false,
    _id: false
  }
);

const supportSchema = new Schema(
  {
    personName: String,
    companyName: String,
    phoneNumber: Number,
    mobile: Number
  },
  {
    id: false,
    _id: false
  }
);

const houseSchema = new Schema(
  {
    userId: mongoose.Types.ObjectId,
    address: addressSchema,
    financials: financialsSchema,
    insurance: insuranceSchema,
    utilities: {
      electricity: utilitiesSchema,
      internet: utilitiesSchema,
      tv_provider: utilitiesSchema,
      gas: utilitiesSchema,
      oil: utilitiesSchema,
      netflix: utilitiesSchema,
      hulu: utilitiesSchema
    },
    support: {
      plumber: [supportSchema],
      electrician: [supportSchema],
      hvac: [supportSchema]
    }
  },
  {
    timestamps: true
  }
);

module.exports = {
  House: mongoose.model("house", houseSchema)
};
