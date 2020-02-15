// @flow
import * as React from 'react';
import { Flex, Text } from '@chakra-ui/core';

export const ValueCard: React.StatelessFunctionalComponent<{ label: string, value: number }> = ({
  label,
  value,
}) => {
  return (
    <Flex p={1} direction="column" bg="blackAlpha.400" align="center" borderRadius={4}>
      <Text mb={0} fontSize="sm" fontWeight={600}>
        {label}
      </Text>
      <Text fontSize="sm">£{value}</Text>
    </Flex>
  );
};
