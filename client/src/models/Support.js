// @flow
import type { Option } from './Option';
import { capitalize } from '../utils/string';

const supportTypes = ['plumber', 'electrician', 'hvac'];
type SupportType = 'plumber' | 'electrician' | 'hvac';

export const SUPPORT_OPTIONS: Array<Option> = supportTypes.map(support => ({
  value: support,
  label: capitalize(support),
}));

export type Support = {|
  _id?: string,
  id?: string,
  supportType: SupportType,
  companyName?: string,
  personName?: string,
  phoneNumber?: string,
  mobile?: string,
|};

export const defaultSupportData = [];
