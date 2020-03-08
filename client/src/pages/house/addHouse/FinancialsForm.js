import { Box, CheckboxGroup, Grid, Stack, Checkbox } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../../components/form/FormField';
import { FinancialsFooter } from './Footer';
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

export const FinancialsForm = React.forwardRef(
  ({ goToNextStep, goToPreviousStep, initialValues }, ref) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const { handleSubmit, errors, formState, getValues, register, setValue } = formProps;

    React.useEffect(() => {
      register({ name: PAYMENT_FREQ_FIELD });
    }, [register]);

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = () => {
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
                label={MORTGAGE_LABEL}
                registerFn={register}
                defaultValue={initialValues?.financials?.mortgage}
              />
              <Stack mb={5}>
                <FormNumberInput
                  leftContent="$"
                  registerFn={register}
                  errors={errors}
                  fieldName={MORTGAGE_PAYMENT_FIELD}
                  label={MORTGAGE_PAYMENT_LABEL}
                  defaultValue={initialValues?.financials?.mortgagePayment}
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
                label={INTEREST_RATE_LABEL}
                step={0.01}
                max={100}
                registerFn={register}
                defaultValue={initialValues?.financials?.interest}
              />
              <FormInput
                errors={errors}
                fieldName={MORTGAGE_COMPANY_FIELD}
                label={MORTGAGE_COMPANY_LABEL}
                registerFn={register}
              />
              <FormNumberInput
                errors={errors}
                fieldName={MORTGAGE_COMPANY_PHONE_FIELD}
                label={MORTGAGE_COMPANY_PHONE_LABEL}
                registerFn={register}
                defaultValue={initialValues?.financials?.mortgageCompanyPhone}
              />
            </Box>
            <Box>
              <FormNumberInput
                leftContent="$"
                errors={errors}
                fieldName={INSURANCE_COST_FIELD}
                label={INSURANCE_COST_LABEL}
                registerFn={register}
                defaultValue={initialValues?.insurance?.cost}
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_COMPANY_FIELD}
                label={INSURANCE_COMPANY_LABEL}
                registerFn={register}
              />
              <FormNumberInput
                errors={errors}
                fieldName={INSURANCE_COMPANY_PHONE_FIELD}
                label={INSURANCE_COMPANY_PHONE_LABEL}
                registerFn={register}
                defaultValue={initialValues?.insurance?.companyPhone}
              />
              <FormInput
                errors={errors}
                fieldName={INSURANCE_BROKER_FIELD}
                label={INSURANCE_BROKER_LABEL}
                registerFn={register}
              />
            </Box>
          </Grid>

          <FinancialsFooter goToPreviousStep={goToPreviousStep} />
        </Box>
      </form>
    );
  },
);
