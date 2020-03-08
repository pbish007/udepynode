import * as React from 'react';
import { Flex, Text } from '@chakra-ui/core';

export const DetailListItem = ({ title, children }) => {
  return (
    <Flex mb={8} borderRadius={2} shadow="md" direction="column">
      {!!title && (
        <Text fontWeight="bold" bg="blackAlpha.100" p={2}>
          {title}
        </Text>
      )}
      {children}
    </Flex>
  );
};
