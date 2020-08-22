// @flow

import type { Utility } from './Utility';
import type { Support } from './Support';

export const defaultAddress = {
  street: '',
  city: '',
  zip: '',
  state: '',
  country: '',
};

export type HouseImage = {
  _id: string,
  url: string,
  isDefault?: boolean,
};

export type Address = {|
  street: string,
  city: string,
  zip: string,
  state: string,
  country: string,
  images?: ?Array<HouseImage>,
|};

export type NamedUtility = {
  companyName: string,
  ...Utility,
};

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
  support: Array<Support>,
  utilities: Array<Utility>,
|};

export type House = {|
  _id: string,
  ...AddHouse<number>,
|};
