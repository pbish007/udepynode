// @flow
import type { Option } from './Option';
import { capitalize } from '../utils/string';

const utilityTypes = ['electricity', 'gas', 'internet', 'oil', 'tv'];
type UtilityType = 'electricity' | 'gas' | 'internet' | 'oil' | 'tv';
export const UTILITY_OPTIONS: Array<Option> = utilityTypes.map(u => ({
  value: u,
  label: capitalize(u),
}));
export type Utility = {
  id: string,
  account: string,
  monthlyCost: string,
  supportNumber: string,
  companyName: string,
  utilityType: UtilityType,
};
export const defaultUtilities: Array<Utility> = [];
