// @flow
import * as React from 'react';
import { Flex, Text } from '@chakra-ui/core';

type Props = {
  title?: string,
  children: React.Node,
};

export const DetailListItem: React.StatelessFunctionalComponent<Props> = ({ title, children }) => {
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
