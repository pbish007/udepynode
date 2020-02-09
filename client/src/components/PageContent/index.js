// @flow
import * as React from 'react';
import { Box } from '@chakra-ui/core';

export const PageContent = ({ children }: { children: React.Node }) => {
  return <Box p={15}>{children}</Box>;
};
