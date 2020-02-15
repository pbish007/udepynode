// @flow
import * as React from 'react';
import { Box } from '@chakra-ui/core';
import type { Financials, Insurance } from '../models';

type FinancialsProps = {|
  data: { financials: Financials, insurance: Insurance },
|};

export const FinancialsDetails: React.StatelessFunctionalComponent<FinancialsProps> = () => {
  return <Box p={4}>Financials</Box>;
};
