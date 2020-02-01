// @flow
import { Box, Grid } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../form/FormField';
import { Footer } from './Footer';

type FinancialsFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

const MORTGAGE_FIELD = 'financials.mortgage';
const MORTGAGE_PAYMENT_FIELD = 'financials.mortgagePayment';
const INTEREST_RATE_FIELD = 'financials.interest';
const MORTGAGE_COMPANY_FIELD = 'financials.mortgageCompany';
const INSURANCE_COST_FIELD = 'insurance.cost';
const INSURANCE_COMPANY_FIELD = 'insurance.company';
const INSURANCE_BROKER_FIELD = 'insurance.broker';

export const FinancialsForm = React.forwardRef<FinancialsFormProps, any>(
  ({ goToNextStep, goToPreviousStep }: FinancialsFormProps, ref: any) => {
    const formProps = useForm({ mode: 'onChange' });
    const { handleSubmit, errors, formState, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      if (formState.isValid) {
        goToNextStep();
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 10]}>
            <Box>
              <FormNumberInput errors={errors} fieldName={MORTGAGE_FIELD} label="Mortgage" />
              <FormNumberInput
                errors={errors}
                fieldName={MORTGAGE_PAYMENT_FIELD}
                label="Mortgage Payment"
              />
              <FormNumberInput
                errors={errors}
                fieldName={INTEREST_RATE_FIELD}
                label="Interest Rate"
                step={0.01}
                max={100}
                mb={5}
              />
              <FormInput
                errors={errors}
                fieldName={MORTGAGE_COMPANY_FIELD}
                label="Mortgage Company"
              />
            </Box>
            <Box>
              <FormNumberInput
                errors={errors}
                fieldName={INSURANCE_COST_FIELD}
                label="Insurance Cost"
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_COMPANY_FIELD}
                label="Insurance Company"
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_BROKER_FIELD}
                label="Insurance Broker"
              />
            </Box>
          </Grid>

          <Footer
            rightButton={{ text: 'Utilities' }}
            leftButton={{ text: 'Address', onClick: goToPreviousStep }}
          />
        </Box>
      </form>
    );
  },
);
