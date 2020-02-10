// @flow
import { Box, CheckboxGroup, Grid, Stack, Checkbox } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../components/form/FormField';
import { Footer } from './Footer';

type FinancialsFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

const MORTGAGE_FIELD = 'financials.mortgage';
const MORTGAGE_PAYMENT_FIELD = 'financials.mortgagePayment';
const PAYMENT_FREQ_FIELD = 'financials.paymentFrequency';
const INTEREST_RATE_FIELD = 'financials.interest';
const MORTGAGE_COMPANY_FIELD = 'financials.mortgageCompany';
const MORTGAGE_COMPANY_PHONE_FIELD = 'financials.mortgageCompanyPhone';
const INSURANCE_COST_FIELD = 'insurance.cost';
const INSURANCE_COMPANY_PHONE_FIELD = 'insurance.companyPhone';
const INSURANCE_COMPANY_FIELD = 'insurance.company';
const INSURANCE_BROKER_FIELD = 'insurance.broker';

export type FinancialsFormModel = {|
  financials: Object,
  insurance: Object,
|};

export const FinancialsForm = React.forwardRef<FinancialsFormProps, any>(
  ({ goToNextStep, goToPreviousStep }: FinancialsFormProps, ref: any) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const formProps = useForm({ mode: 'onChange' });
    const { handleSubmit, errors, formState, getValues, register, setValue } = formProps;

    React.useEffect(() => {
      register({ name: PAYMENT_FREQ_FIELD });
    }, [register]);

    React.useImperativeHandle(ref, () => ({
      getValues: (): FinancialsFormModel => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      if (formState.isValid) {
        goToNextStep();
      }
    };

    const onCheckboxChange = args => {
      const checkedValue = args[args.length - 1];
      setSelectedValues(checkedValue);
      setValue(PAYMENT_FREQ_FIELD, checkedValue);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 10]}>
            <Box>
              <FormNumberInput
                leftContent="$"
                errors={errors}
                fieldName={MORTGAGE_FIELD}
                label="Mortgage"
                registerFn={register}
              />
              <Stack mb={5}>
                <FormNumberInput
                  leftContent="$"
                  registerFn={register}
                  errors={errors}
                  fieldName={MORTGAGE_PAYMENT_FIELD}
                  label="Mortgage Payment"
                />
                <CheckboxGroup
                  name={PAYMENT_FREQ_FIELD}
                  value={selectedValues}
                  onChange={onCheckboxChange}
                  isInline>
                  <Checkbox value="monthly">monthly</Checkbox>
                  <Checkbox value="15/30">15/30</Checkbox>
                  <Checkbox value="bi-weekly">bi-weekly</Checkbox>
                </CheckboxGroup>
              </Stack>
              <FormNumberInput
                errors={errors}
                fieldName={INTEREST_RATE_FIELD}
                label="Interest Rate"
                step={0.01}
                max={100}
                registerFn={register}
              />
              <FormInput
                errors={errors}
                fieldName={MORTGAGE_COMPANY_FIELD}
                label="Mortgage Company"
                registerFn={register}
              />
              <FormNumberInput
                errors={errors}
                fieldName={MORTGAGE_COMPANY_PHONE_FIELD}
                label="Mortgage Company Phone"
                registerFn={register}
              />
            </Box>
            <Box>
              <FormNumberInput
                leftContent="$"
                errors={errors}
                fieldName={INSURANCE_COST_FIELD}
                label="Insurance Cost"
                registerFn={register}
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_COMPANY_FIELD}
                label="Insurance Company"
                registerFn={register}
              />
              <FormNumberInput
                errors={errors}
                fieldName={INSURANCE_COMPANY_PHONE_FIELD}
                label="Insurance Company Phone"
                registerFn={register}
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_BROKER_FIELD}
                label="Insurance Broker"
                registerFn={register}
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
