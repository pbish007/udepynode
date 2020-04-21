// @flow
import * as React from 'react';
import { Box, Divider, Text } from '@chakra-ui/core';

export const PageContent = ({ children, heading }: { children: React.Node, heading?: string }) => {
  return (
    <Box pl={15} pr={15} pt={0} pb={0}>
      {heading ? (
        <React.Fragment>
          <Text fontSize={28} textAlign="center">
            {heading}
          </Text>
          <Divider />
        </React.Fragment>
      ) : null}
      <Box pt={2} pb={2}>
        {children}
      </Box>
    </Box>
  );
};
