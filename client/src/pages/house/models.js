// @flow

export const defaultAddress = {
  street: '',
  city: '',
  zip: '',
  country: '',
};

const defaultNamedUtility = { account: '', monthlyCost: '', supportNumber: '', companyName: '' };
const defaultUtility = { account: '', monthlyCost: '', supportNumber: '' };

export const defaultUtilities = {
  electricity: defaultNamedUtility,
  gas: defaultNamedUtility,
  hulu: defaultUtility,
  netflix: defaultUtility,
  internet: defaultNamedUtility,
  oil: defaultNamedUtility,
  tv_provider: defaultNamedUtility,
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

export type Utility = {
  account: string,
  monthlyCost: string,
  supportNumber: string,
};

export type NamedUtility = {
  companyName: string,
  ...Utility,
};

export type Utilities = {|
  electricity: NamedUtility,
  gas: NamedUtility,
  hulu: Utility,
  netflix: Utility,
  internet: NamedUtility,
  oil: NamedUtility,
  tv_provider: NamedUtility,
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
