// @flow
import * as React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import type { Financials, Insurance } from '../models';
import { DisplayField } from '../../../components/DisplayField';
import {
  INSURANCE_BROKER_LABEL,
  INSURANCE_COMPANY_LABEL,
  INSURANCE_COMPANY_PHONE_LABEL,
  INSURANCE_COST_LABEL,
  INTEREST_RATE_LABEL,
  MORTGAGE_COMPANY_LABEL,
  MORTGAGE_COMPANY_PHONE_LABEL,
  MORTGAGE_LABEL,
  MORTGAGE_PAYMENT_LABEL,
} from '../constants';

type FinancialsProps = {|
  data: { financials: Financials, insurance: Insurance },
|};

export const FinancialsDetails: React.StatelessFunctionalComponent<FinancialsProps> = ({
  data,
}) => {
  const { financials, insurance } = data;
  const {
    interest,
    mortgage,
    mortgageCompany,
    mortgageCompanyPhone,
    mortgagePayment,
    paymentFrequency,
  } = financials;
  const { cost, broker, company, companyPhone } = insurance;

  return (
    <Box p={4}>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 10]}>
        <Box>
          <DisplayField label={MORTGAGE_LABEL} text={`$${mortgage || 0}`} />
          <DisplayField
            label={MORTGAGE_PAYMENT_LABEL}
            text={`$${mortgagePayment || 0} ${paymentFrequency}`}
          />
          <DisplayField label={INTEREST_RATE_LABEL} text={`$${interest || 0}`} />
          <DisplayField label={MORTGAGE_COMPANY_LABEL} text={mortgageCompany} />
          <DisplayField label={MORTGAGE_COMPANY_PHONE_LABEL} text={mortgageCompanyPhone} />
        </Box>
        <Box>
          <DisplayField label={INSURANCE_COST_LABEL} text={`$${cost || 0}`} />
          <DisplayField label={INSURANCE_COMPANY_LABEL} text={`$${company || 0}`} />
          <DisplayField label={INSURANCE_COMPANY_PHONE_LABEL} text={companyPhone} />
          <DisplayField label={INSURANCE_BROKER_LABEL} text={broker} />
        </Box>
      </Grid>
    </Box>
  );
};
