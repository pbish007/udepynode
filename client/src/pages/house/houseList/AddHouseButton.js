// @flow
import { StyledLink } from '../../../components/StyledLink';
import { ROUTES } from '../../../constants';
import { Box, Flex, Icon, Text } from '@chakra-ui/core';
import * as React from 'react';

const buttonProps = {
  display: 'inline-flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px',
  borderColor: 'blackAlpha.200',
  boxShadow: 'md',
  bg: 'blackAlpha.700',
  color: 'white',
  height: '48px',
};

export const AddHouseButtonWithText: React.StatelessFunctionalComponent<any> = () => {
  return (
    <StyledLink to={ROUTES.ADD_HOUSE}>
      <Box {...buttonProps} p={4} borderRadius="24px" width="auto">
        <Flex align="center">
          <Icon name="add" mr={2} />
          <Text>Add New</Text>
        </Flex>
      </Box>
    </StyledLink>
  );
};
