import * as React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

export const DisplayField = ({ label, text }) => {
  return (
    <Flex direction={['column', 'row']} mb={4}>
      <Box as="label" fontWeight="bold" mb="0px" mr={[0, 2]}>
        {label}:
      </Box>
      <Text>{text}</Text>
    </Flex>
  );
};
