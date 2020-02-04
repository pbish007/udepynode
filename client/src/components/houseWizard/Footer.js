// @flow
import * as React from 'react';
import { Button, Flex } from '@chakra-ui/core';

type ButtonProps = {
  text: string,
  variant?: 'outline' | 'solid',
  onClick?: Function,
  type?: 'button' | 'submit',
};

export const Footer = ({
  leftButton,
  rightButton,
}: {
  leftButton?: ButtonProps,
  rightButton: ButtonProps,
}) => {
  const justifyContent = !!leftButton ? 'space-between' : 'flex-end';
  return (
    <Flex justifyContent={justifyContent} mt={10}>
      {!!leftButton && (
        <Button
          onClick={leftButton.onClick}
          type="button"
          leftIcon="arrow-back"
          variant="outline"
          mr={5}>
          {leftButton.text}
        </Button>
      )}
      {!!rightButton && (
        <Button
          type={rightButton.type || 'submit'}
          rightIcon="arrow-forward"
          variant={rightButton.variant || 'outline'}
          onClick={rightButton.onClick}>
          {rightButton.text}
        </Button>
      )}
    </Flex>
  );
};
