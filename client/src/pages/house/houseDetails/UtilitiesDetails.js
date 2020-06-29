// @flow
import * as React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/core';
import { capitalize } from '../../../utils/string';
import type { Utility } from '../../../models/Utility';
import { SectionHeading } from './index';

type UtilitiesProps = {|
  utilities: Array<Utility>,
  title: string,
|};

const UtilityInfo = ({ utility }: { utility: Utility }) => {
  const { account, monthlyCost, supportNumber, utilityType, companyName } = utility;

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
      gap={[0, null, 3]}
      p={2}
      alignItems="center">
      <Text>{utilityType ? capitalize(utilityType) : '-'}</Text>
      <Text>{companyName || '-'}</Text>
      <Text>{account || '-'}</Text>
      <Text>{monthlyCost || '-'}</Text>
      <Text>{supportNumber || '-'}</Text>
    </Grid>
  );
};

export const UtilitiesDetails: React.StatelessFunctionalComponent<UtilitiesProps> = ({
  utilities,
  title,
}) => {
  return (
    <Box pt={8} pb={8}>
      <SectionHeading>{title}</SectionHeading>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
        gap={[0, null, 3]}
        p={2}
        alignItems="center"
        fontWeight="bold"
        borderBottom="1px solid #eee">
        <Text>Utility Type</Text>
        <Text>Company Name</Text>
        <Text>Account</Text>
        <Text>Cost</Text>
        <Text>Support Number</Text>
      </Grid>

      <Stack>
        {utilities.map(u => {
          return <UtilityInfo utility={u} key={u.id} />;
        })}
      </Stack>
    </Box>
  );
};
