// @flow
import * as React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import type { Address } from '../models';
import { CITY_LABEL, COUNTRY_LABEL, STREET_LABEL, ZIP_LABEL } from '../constants';
import { DisplayField } from '../../../components/DisplayField';

type AddressFormProps = {|
  data: Address,
|};

export const AddressDetails: React.StatelessFunctionalComponent<AddressFormProps> = ({ data }) => {
  const { street, city, zip, country } = data;
  return (
    <Box p={4}>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
        <Box>
          <DisplayField text={street} label={STREET_LABEL} />
          <DisplayField text={city} label={CITY_LABEL} />
          <DisplayField text={zip} label={ZIP_LABEL} />
          <DisplayField text={country} label={COUNTRY_LABEL} />
        </Box>
        <Box bg="blackAlpha.200">Street View</Box>
        <Box bg="blackAlpha.200">Map</Box>
      </Grid>
    </Box>
  );
};
