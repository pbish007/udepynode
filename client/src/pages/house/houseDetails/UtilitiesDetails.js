// @flow
import * as React from 'react';
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import type { NamedUtility, Utilities, Utility } from '../models';
import { DetailListItem } from '../../../components/DetailListItem';

interface UtilitiesProps {
  data: Utilities;
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
  const { account, monthlyCost, supportNumber } = utility;

  let companyName;
  if (typeof utility.companyName !== 'undefined') {
    companyName = utility.companyName || '-';
  } else {
    companyName = label;
  }

  return (
    <DetailListItem title={label}>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(4, 1fr)']}
        gap={[0, null, 3]}
        p={2}
        alignItems="center">
        <UtilityColumn value={companyName} title="Company Name" />
        <UtilityColumn value={account || '-'} title="Account" />
        <UtilityColumn value={monthlyCost || '-'} title="Cost" />
        <UtilityColumn value={supportNumber || '-'} title="Support Number" />
      </Grid>
    </DetailListItem>
  );
};

export const UtilitiesDetails: React.StatelessFunctionalComponent<UtilitiesProps> = ({ data }) => {
  const { electricity, gas, hulu, internet, netflix, oil, tv_provider } = data;
  return (
    <Box p={4}>
      <Stack>
        <UtilityInfo utility={electricity} label="Electricity" />
        <UtilityInfo utility={internet} label="Internet" />
        <UtilityInfo utility={tv_provider} label="TV Provider" />
        <UtilityInfo utility={gas} label="Gas" />
        <UtilityInfo utility={oil} label="Oil" />
        <UtilityInfo utility={netflix} label="Netflix" />
        <UtilityInfo utility={hulu} label="Hulu" />
      </Stack>
    </Box>
  );
};
