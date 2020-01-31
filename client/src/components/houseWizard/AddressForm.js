// @flow
import * as React from 'react';
import { Box, Button, Flex, Grid, Input } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { FormField, FormInput } from '../form/FormField';

const ADDRESS1_FIELD = 'address.street';
const CITY_FIELD = 'address.city';
const ZIP_FIELD = 'address.zip';
const COUNTRY_FIELD = 'address.country';

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
        return getValues({ nest: true });
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
              <FormInput
                errors={errors}
                fieldName={ADDRESS1_FIELD}
                label="Street"
                registerFn={register({ required: 'Street is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={CITY_FIELD}
                label="City/Town"
                registerFn={register({ required: 'City/Town is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={ZIP_FIELD}
                label="Zip/Postal"
                registerFn={register({ required: 'Zip/Postal is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={COUNTRY_FIELD}
                label="Country"
                registerFn={register({ required: 'Country is required' })}
              />
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
