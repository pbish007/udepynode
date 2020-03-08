import * as React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const BackLink = ({ route, text }) => {
  return (
    <Flex justifyContent="flex-start" mb={2} align="center" fontWeight="bold">
      <Icon name="arrow-back" mr={1} />
      <Link as={RouterLink} to={route} leftIcon="arrow-back" variant="ghost">
        {text}
      </Link>
    </Flex>
  );
};

export const BackToDashboard = () => <BackLink route={ROUTES.HOUSE} text="Dashboard" />;
