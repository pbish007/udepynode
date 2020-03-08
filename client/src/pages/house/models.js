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

const defaultSupportType = {
  companyName: '',
  personName: '',
  phoneNumber: '',
  mobile: '',
};

export const defaultSupportData = {
  plumber: [{ ...defaultSupportType }],
  electrician: [{ ...defaultSupportType }],
  hvac: [{ ...defaultSupportType }],
};
