// @flow
import * as React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import type { Financials, Insurance } from '../../../models/house';
import { DisplayField } from '../../../components/DisplayField';
import {
  ASSET_VALUE_LABEL,
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
import { SectionHeading } from './index';

type FinancialsProps = {|
  data: { financials: Financials<number>, insurance: Insurance<number> },
  title: string,
|};

export const FinancialsDetails: React.StatelessFunctionalComponent<FinancialsProps> = ({
  data,
  title,
}) => {
  const { financials, insurance } = data;
  const {
    assetValue,
    interest,
    mortgage,
    mortgageCompany,
    mortgageCompanyPhone,
    mortgagePayment,
    paymentFrequency,
  } = financials;
  const { cost, broker, company, companyPhone } = insurance;

  return (
    <Box pt={8}>
      <SectionHeading>{title}</SectionHeading>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 10]}>
        <Box>
          <DisplayField label={ASSET_VALUE_LABEL} text={`$${assetValue || 0}`} />
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
          <DisplayField label={INSURANCE_COMPANY_LABEL} text={`${company}`} />
          <DisplayField label={INSURANCE_COMPANY_PHONE_LABEL} text={companyPhone} />
          <DisplayField label={INSURANCE_BROKER_LABEL} text={broker} />
        </Box>
      </Grid>
    </Box>
  );
};
