// @flow
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/core';
import { StyledRouterLink } from '../StyledLink';
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
  height: '24px',
};

type Props = {
  to: string,
  text: string,
  icon?: string,
};

const ButtonContent: React.StatelessFunctionalComponent<{
  text: string,
  icon?: string,
}> = ({ text, icon }) => {
  return (
    <Box {...buttonProps} p={4} borderRadius="5px" width="auto" _hover={{ bg: 'blackAlpha.700' }}>
      <Flex align="center">
        {icon ? <Icon name={icon} mr={1} /> : null}
        <Text>{text}</Text>
      </Flex>
    </Box>
  );
};

export const RoundedButton = ({
  text,
  icon,
  onClick,
}: {
  text: string,
  icon?: string,
  onClick: MouseEventHandler,
}) => (
  <Button
    {...buttonProps}
    p={2}
    borderRadius="5px"
    width="auto"
    onClick={onClick}
    _hover={{ bg: 'blackAlpha.800' }}>
    <Flex align="center">
      {icon ? <Icon name={icon} mr={2} /> : null}
      <Text>{text}</Text>
    </Flex>
  </Button>
);

export const RoundedLinkButton: React.StatelessFunctionalComponent<Props> = ({
  to,
  text,
  icon,
}) => {
  return (
    <StyledRouterLink to={to}>
      <ButtonContent text={text} icon={icon} />
    </StyledRouterLink>
  );
};
