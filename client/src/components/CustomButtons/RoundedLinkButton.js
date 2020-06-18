// @flow
import { Box, Button, Flex, Icon, IconButton as ChakraIconButton, Text } from '@chakra-ui/core';
import { StyledRouterLink } from '../StyledLink';
import * as React from 'react';

const buttonProps = {
  display: 'inline-flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0px',
  borderColor: 'white',
  bg: 'white',
  color: 'black',
  height: '24px',
};

type Props = {
  to: string,
  text?: string,
  icon?: string,
};

const ButtonContent: React.StatelessFunctionalComponent<{
  text?: string,
  icon?: string,
}> = ({ text, icon }) => {
  return (
    <Box {...buttonProps} p={2} borderRadius="5px" width="auto" _hover={{ bg: 'blackAlpha.700' }}>
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
  text?: string,
  icon?: string,
  onClick: MouseEventHandler,
}) => (
  <Button
    {...buttonProps}
    p={2}
    borderRadius="5px"
    width="auto"
    onClick={onClick}
    _hover={{ bg: 'white' }}>
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

const iconButtonProps = {
  bg: 'transparent',
  _hover: { bg: 'transparent' },
  _focus: { outline: 'none' },
  _active: { backgroundColor: 'transparent' },
};

export const IconButton: React.StatelessFunctionalComponent<{
  icon: string,
  onClick: MouseEventHandler,
  ...
}> = ({ icon, onClick, ...props }) => {
  return <ChakraIconButton {...props} {...iconButtonProps} icon={icon} onClick={onClick} />;
};
