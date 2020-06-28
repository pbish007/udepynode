// @flow
import * as React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/core';
import { DetailListItem } from '../../../components/DetailListItem';
import type { Support, SupportType } from '../../../models/Support';

type SupportProps = {|
  data: Support,
|};

const SupportItemRow = ({
  children,
  fontSize = 'sm',
  fontWeight = 'normal',
}: {
  children: React.Node,
  fontSize?: string,
  fontWeight?: string,
}) => {
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', null, 'repeat(4, 1fr)']}
      gap={[0, null, 3]}
      p={2}
      alignItems="center"
      fontWeight={fontWeight}
      fontSize={fontSize}>
      {children}
    </Grid>
  );
};

export const SupportDetail = ({
  supportData,
  title,
}: {
  supportData: Array<SupportType>,
  title: string,
}) => {
  return (
    <DetailListItem title={title}>
      <SupportItemRow fontSize="sm" fontWeight="bold">
        <Text>Company Name</Text>
        <Text>Name</Text>
        <Text>Office Phone Number</Text>
        <Text>Mobile Number</Text>
      </SupportItemRow>

      {supportData.map((p, i) => {
        return (
          <SupportItemRow key={i}>
            <Text>{p.companyName || '-'}</Text>
            <Text>{p.personName || '-'}</Text>
            <Text>{p.phoneNumber || '-'}</Text>
            <Text>{p.mobile || '-'}</Text>
          </SupportItemRow>
        );
      })}
    </DetailListItem>
  );
};

export const SupportDetails: React.StatelessFunctionalComponent<SupportProps> = ({ data }) => {
  const { electrician, hvac, plumber } = data;
  return (
    <Box pt={8}>
      <Stack>
        <SupportDetail supportData={plumber} title="Plumber" />
        <SupportDetail supportData={electrician} title="Electrician" />
        <SupportDetail supportData={hvac} title="HVAC" />
      </Stack>
    </Box>
  );
};
