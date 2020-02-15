// @flow
import * as React from 'react';
import { Box } from '@chakra-ui/core';
import type { Address } from '../models';

type AddressFormProps = {|
  data: Address,
|};

export const AddressDetails: React.StatelessFunctionalComponent<AddressFormProps> = () => {
  return <Box p={4}>Address</Box>;
};
