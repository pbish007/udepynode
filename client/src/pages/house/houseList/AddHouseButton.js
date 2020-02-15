// @flow
import { StyledLink } from '../../../components/StyledLink';
import { ROUTES } from '../../../constants';
import { Box, Icon } from '@chakra-ui/core';
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
export const AddHouseButton: React.StatelessFunctionalComponent<any> = (props: any) => {
  return (
    <StyledLink to={ROUTES.ADD_HOUSE}>
      <Box {...buttonProps} p={2} borderRadius="50%" width="48px" {...props}>
        <React.Fragment>
          <Icon name="add" />
        </React.Fragment>
      </Box>
    </StyledLink>
  );
};
export const AddHouseButtonWithText: React.StatelessFunctionalComponent<any> = () => {
  return (
    <StyledLink to={ROUTES.ADD_HOUSE}>
      <Box {...buttonProps} p={4} borderRadius="24px" width="auto">
        <React.Fragment>Add New</React.Fragment>
      </Box>
    </StyledLink>
  );
};
