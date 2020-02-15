// @flow
import * as React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const BackLink: React.StatelessFunctionalComponent<{ route: string, text: string }> = ({ route, text }) => {
  return (
    <Flex justifyContent="flex-start" mb={2} align="center">
      <Icon name="arrow-back" mr={1} />
      <Link as={RouterLink} to={route} leftIcon="arrow-back" variant="ghost">
        Dashboard
      </Link>
    </Flex>
  );
};
