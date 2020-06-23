// @flow
import * as React from 'react';
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import type { NamedUtility, Utility } from '../models';
import { DetailListItem } from '../../../components/DetailListItem';
import { capitalize } from '../../../utils/string';

interface UtilitiesProps {
  utilities: Array<Utility>;
}

const UtilityColumn: React.StatelessFunctionalComponent<{ title: string, value: string }> = ({
  title,
  value,
}) => {
  return (
    <Flex direction="column" fontSize="sm">
      <Text fontWeight="bold">{title}:</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

const UtilityInfo = ({ utility, label }: { utility: Utility | NamedUtility, label: string }) => {
  const { account, monthlyCost, supportNumber, utilityType } = utility;

  let companyName;
  if (typeof utility.companyName !== 'undefined') {
    companyName = utility.companyName || '-';
  } else {
    companyName = label;
  }

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
      gap={[0, null, 3]}
      p={2}
      alignItems="center">
      <Text>{utilityType ? capitalize(utilityType) : '-'}</Text>
      <Text>{companyName}</Text>
      <Text>{account || '-'}</Text>
      <Text>{monthlyCost || '-'}</Text>
      <Text>{supportNumber || '-'}</Text>
    </Grid>
  );
};

export const UtilitiesDetails: React.StatelessFunctionalComponent<UtilitiesProps> = ({
  utilities,
}) => {
  return (
    <Box pt={8} pb={8}>
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
          return <UtilityInfo utility={u} key={u.id} label={u.utilityType} />;
        })}
      </Stack>
    </Box>
  );
};
