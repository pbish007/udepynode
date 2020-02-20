// @flow
import { Box, Flex, Icon, Text } from '@chakra-ui/core';
import { StyledLink } from '../StyledLink';
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

type Props = {
  to: string,
  text: string,
  icon?: string,
};

export const RoundedLinkButton: React.StatelessFunctionalComponent<Props> = ({ to, text, icon }) => {
  return (
    <StyledLink to={to}>
      <Box {...buttonProps} p={4} borderRadius="24px" width="auto">
        <Flex align="center">
          {icon ? <Icon name={icon} mr={2} /> : null}
          <Text>{text}</Text>
        </Flex>
      </Box>
    </StyledLink>
  );
};
