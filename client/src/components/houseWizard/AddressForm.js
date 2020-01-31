// @flow
import * as React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/core';
import get from 'lodash.get';
import { useForm } from 'react-hook-form';
import type { Errors } from './types';

const ADDRESS1_FIELD = 'address.street';
const CITY_FIELD = 'address.city';
const ZIP_FIELD = 'address.zip';
const COUNTRY_FIELD = 'address.country';

type FormFieldProps = {|
  errors: Errors,
  fieldName: string,
  label: string,
  children: React.Node,
|};

export const FormField = ({ errors, fieldName, label, children }: FormFieldProps) => {
  return (
    <FormControl isInvalid={get(errors, fieldName)} mb={1}>
      <FormLabel htmlFor={fieldName} mb={0}>
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage>{get(errors, `${fieldName}.message`)}</FormErrorMessage>
    </FormControl>
  );
};

type AddressFormProps = {|
  goToNextStep: () => void,
  setIsAddressFormValid: boolean => void,
  updateFormData: Object => void,
|};

export const AddressForm = React.forwardRef<AddressFormProps, any>(
  ({ goToNextStep, setIsAddressFormValid, updateFormData }: AddressFormProps, ref: any) => {
    const formProps = useForm({ mode: 'onChange' });
    const { handleSubmit, errors, register, formState, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues();
      },
    }));

    React.useEffect(() => {
      setIsAddressFormValid(formState.isValid);
    }, [formState.isValid, setIsAddressFormValid]);

    const onSubmit = values => {
      if (formState.isValid) {
        goToNextStep();
        updateFormData(values);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
            <Box>
              <FormField errors={errors} fieldName={ADDRESS1_FIELD} label="Street">
                <Input
                  name={ADDRESS1_FIELD}
                  placeholder="Street"
                  ref={register({ required: 'Street is required' })}
                />
              </FormField>
              <FormField errors={errors} fieldName={CITY_FIELD} label="City/Town">
                <Input
                  name={CITY_FIELD}
                  placeholder="City/Town"
                  ref={register({ required: 'City/Town is required' })}
                />
              </FormField>
              <FormField errors={errors} fieldName={ZIP_FIELD} label="Zip/Postal">
                <Input
                  name={ZIP_FIELD}
                  placeholder="Zip/Postal"
                  ref={register({ required: 'Zip/Postal is required' })}
                />
              </FormField>
              <FormField errors={errors} fieldName={COUNTRY_FIELD} label="Country">
                <Input
                  name={COUNTRY_FIELD}
                  placeholder="Country"
                  ref={register({ required: 'Country is required' })}
                />
              </FormField>
            </Box>
          </Grid>

          <Flex justifyContent="flex-end" pt={2}>
            <Button type="submit" rightIcon="arrow-forward" variant="outline">
              Financials
            </Button>
          </Flex>
        </Box>
      </form>
    );
  },
);
