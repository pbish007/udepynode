// @flow
import * as React from 'react';
import { Box, Button, Grid } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../../components/form/FormField';
import { AddressFooter } from './Footer';
import type { Address } from '../models';
import { CITY_LABEL, COUNTRY_LABEL, STREET_LABEL, ZIP_LABEL } from '../constants';
import { fetchLocationFromAddress } from '../../../api/map';

const ADDRESS1_FIELD = 'address.street';
const CITY_FIELD = 'address.city';
const ZIP_FIELD = 'address.zip';
const COUNTRY_FIELD = 'address.country';

type AddressFormProps = {|
  initialValues?: Object,
  goToNextStep: () => void,
  setIsAddressFormValid: boolean => void,
|};

export type AddressFormModel = {|
  address: Address,
|};

export const AddressForm = React.forwardRef<AddressFormProps, any>(
  ({ goToNextStep, setIsAddressFormValid, initialValues }: AddressFormProps, ref: any) => {
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const [location, setLocation] = React.useState<{ lat: string, lng: string } | null>(null);
    const { handleSubmit, errors, register, formState, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: (): AddressFormModel => {
        return getValues({ nest: true });
      },
    }));

    React.useEffect(() => {
      setIsAddressFormValid(formState.isValid);
    }, [formState.isValid, setIsAddressFormValid]);

    const onSubmit = () => {
      if (formState.isValid) {
        goToNextStep();
      }
    };

    const fetchImages = async () => {
      const address: AddressFormModel = getValues({ nest: true });
      const data = await fetchLocationFromAddress(address);

      if (data) {
        setLocation(data);
      }
    };

    console.log('state', location);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
            <Box>
              <FormInput
                errors={errors}
                fieldName={ADDRESS1_FIELD}
                label={STREET_LABEL}
                registerFn={register({ required: 'Street is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={CITY_FIELD}
                label={CITY_LABEL}
                registerFn={register({ required: 'City/Town is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={ZIP_FIELD}
                label={ZIP_LABEL}
                registerFn={register({ required: 'Zip/Postal is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={COUNTRY_FIELD}
                label={COUNTRY_LABEL}
                registerFn={register({ required: 'Country is required' })}
              />
            </Box>
            <Box>
              <Button onClick={fetchImages}>Get images from Google</Button>
            </Box>
          </Grid>

          <AddressFooter />
        </Box>
      </form>
    );
  },
);
