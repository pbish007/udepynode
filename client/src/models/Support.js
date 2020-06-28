// @flow
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
