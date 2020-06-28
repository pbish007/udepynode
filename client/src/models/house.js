// @flow

import type { Option } from '../components/form/Option';
import { capitalize } from '../utils/string';

const utilityTypes = ['electricity', 'gas', 'internet', 'oil', 'tv'];
type UtilityType = 'electricity' | 'gas' | 'internet' | 'oil' | 'tv';
export const UTILITY_OPTIONS: Array<Option> = utilityTypes.map(u => ({
  value: u,
  label: capitalize(u),
}));

export const defaultAddress = {
  street: '',
  city: '',
  zip: '',
  state: '',
  country: '',
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
  id: string,
  account: string,
  monthlyCost: string,
  supportNumber: string,
  companyName: string,
  utilityType: UtilityType,
};

export const defaultUtilities: Array<Utility> = [];

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
  support: Support,
  utilities: Array<Utility>,
|};

export type House = {|
  _id: string,
  ...AddHouse<number>,
|};
