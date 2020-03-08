import * as React from 'react';
import { Box, Button, Grid } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { FormInput } from '../../../components/form/FormField';
import { AddressFooter } from './Footer';
import { CITY_LABEL, COUNTRY_LABEL, STREET_LABEL, ZIP_LABEL } from '../constants';
import { fetchLocationFromAddress } from '../../../api/map';
import { StaticMap, StaticStreetMap } from '../../../components/Map';

const ADDRESS1_FIELD = 'address.street';
const CITY_FIELD = 'address.city';
const ZIP_FIELD = 'address.zip';
const COUNTRY_FIELD = 'address.country';

export const AddressForm = React.forwardRef(
  ({ goToNextStep, setIsAddressFormValid, initialValues }, ref) => {
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const [location, setLocation] = React.useState(null);
    const { handleSubmit, errors, register, formState, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
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
      const address = getValues({ nest: true });
      const data = await fetchLocationFromAddress(address);

      if (data) {
        setLocation(data);
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
              <Button onClick={fetchImages}>Get images from Google</Button>
            </Box>
            <StaticMap location={location} pt="1.75rem" />
            <StaticStreetMap location={location} pt="1.75rem" />
          </Grid>

          <AddressFooter />
        </Box>
      </form>
    );
  },
);
