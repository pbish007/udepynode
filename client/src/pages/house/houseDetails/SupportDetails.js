// @flow
import * as React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/core';
import type { Support } from '../../../models/Support';
import { capitalize } from '../../../utils/string';
import { SectionHeading } from './index';

type SupportProps = {|
  data: Array<Support>,
  title: string,
|};

const SupportInfo = ({ support }: { support: Support }) => {
  const { companyName, personName, supportType, mobile, phoneNumber } = support;

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
      gap={[0, null, 3]}
      p={2}
      alignItems="center">
      <Text>{supportType ? capitalize(supportType) : '-'}</Text>
      <Text>{companyName || '-'}</Text>
      <Text>{personName || '-'}</Text>
      <Text>{phoneNumber || '-'}</Text>
      <Text>{mobile || '-'}</Text>
    </Grid>
  );
};

export const SupportDetails: React.StatelessFunctionalComponent<SupportProps> = ({
  data,
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
        {data.map(u => {
          return <SupportInfo support={u} key={u.id} />;
        })}
      </Stack>
    </Box>
  );
};
