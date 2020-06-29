// @flow
import * as React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import type { Address } from '../../../models/house';
import { CITY_LABEL, COUNTRY_LABEL, STREET_LABEL, STATE_LABEL, ZIP_LABEL } from '../constants';
import { DisplayField } from '../../../components/DisplayField';
import { fetchLocationFromAddress } from '../../../api/map';
import { StaticMap, StaticStreetMap } from '../../../components/Map';
import { SectionHeading } from './index';

type AddressFormProps = {|
  data: Address,
  title: string,
|};

export const AddressDetails: React.StatelessFunctionalComponent<AddressFormProps> = ({
  data,
  title,
}) => {
  const [location, setLocation] = React.useState<{ lat: string, lng: string } | null>(null);

  const { street, city, zip, state, country } = data;

  React.useEffect(() => {
    fetchLocationFromAddress({ address: data }).then(locationData => {
      if (locationData) {
        setLocation(locationData);
      }
    });
  }, [data]);

  console.log('state', location);

  return (
    <Box pt={8}>
      <SectionHeading>{title}</SectionHeading>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
        <Box>
          <DisplayField text={street} label={STREET_LABEL} />
          <DisplayField text={city} label={CITY_LABEL} />
          <DisplayField text={zip} label={ZIP_LABEL} />
          <DisplayField text={state} label={STATE_LABEL} />
          <DisplayField text={country} label={COUNTRY_LABEL} />
        </Box>
        <StaticStreetMap location={location} />
        <StaticMap location={location} />
      </Grid>
    </Box>
  );
};
