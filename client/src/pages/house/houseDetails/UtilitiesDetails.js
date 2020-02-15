// @flow
import * as React from 'react';
import { Box } from '@chakra-ui/core';
import type { Utilities } from '../models';

interface UtilitiesProps {
  data: Utilities;
}

export const UtilitiesDetails: React.StatelessFunctionalComponent<UtilitiesProps> = () => {
  return <Box p={4}>Utilities</Box>;
};
