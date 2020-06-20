// @flow

export const defaultAddress = {
  street: '',
  city: '',
  zip: '',
  state: '',
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
  state: string,
  country: string,
|};

export type SupportType = {|
  companyName?: string,
  personName?: string,
  phoneNumber?: string,
  mobile?: string,
|};

const defaultSupportType: SupportType = {
  companyName: '',
  personName: '',
  phoneNumber: '',
  mobile: '',
};

export type Support = {|
  plumber: Array<SupportType>,
  electrician: Array<SupportType>,
  hvac: Array<SupportType>,
|};

export const defaultSupportData = {
  plumber: [{ ...defaultSupportType }],
  electrician: [{ ...defaultSupportType }],
  hvac: [{ ...defaultSupportType }],
};

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

export type Financials<T> = {|
  assetValue: T,
  mortgage: T,
  mortgagePayment: T,
  interest: T,
  mortgageCompany: string,
  mortgageCompanyPhone: string,
  paymentFrequency: string,
|};

export type Insurance<T> = {|
  cost: T,
  company: string,
  companyPhone: string,
  broker: string,
|};

export type AddHouse<T> = {|
  address: Address,
  financials: Financials<T>,
  insurance: Insurance<T>,
  support: Support,
  utilities: Utilities,
|};

export type House = {|
  _id: string,
  ...AddHouse<number>,
|};
