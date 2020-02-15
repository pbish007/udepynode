// @flow

export const defaultAddress = {
  street: '',
  city: '',
  zip: '',
  country: '',
};

export const defaultUtilities = {
  electricity: {},
  gas: {},
  hulu: {},
  netflix: {},
  internet: {},
  oil: {},
  tv_provider: {},
};

export type Address = {|
  street: string,
  city: string,
  zip: string,
  country: string,
|};

export type Support = {|
  plumber: Array<Object>,
  electrician: Array<Object>,
  hvac: Array<Object>,
|};

export type Utilities = {|
  electricity: Object,
  gas: Object,
  hulu: Object,
  netflix: Object,
  internet: Object,
  oil: Object,
  tv_provider: Object,
|};

export type Financials = {|
  mortgage: string,
  mortgagePayment: string,
  interest: string,
  mortgageCompany: string,
  mortgageCompanyPhone: string,
  paymentFrequency: string,
|};

export type Insurance = {|
  cost: string,
  company: string,
  companyPhone: string,
  broker: string,
|};

export type AddHouse = {|
  address: Address,
  financials: Financials,
  insurance: Insurance,
  support: Support,
  utilities: Utilities,
|};

export type House = {|
  _id: string,
  ...AddHouse,
|};
