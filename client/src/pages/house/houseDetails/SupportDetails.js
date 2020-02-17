// @flow
import * as React from 'react';
import { Box } from '@chakra-ui/core';
import type { Support } from '../models';

type SupportProps = {|
  data: Support,
|};

export const SupportDetails: React.StatelessFunctionalComponent<SupportProps> = () => {
  return <Box p={4}>Support</Box>;
};
