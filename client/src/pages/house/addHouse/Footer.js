// @flow
import * as React from 'react';
import { Button, Flex } from '@chakra-ui/core';

type ButtonProps = {
  text: string,
  variant?: 'outline' | 'solid', // can only be outline or solid
  onClick?: Function,
  type?: 'button' | 'submit', // can only be button or submit
};

export const Footer = ({
  leftButton,
  rightButton,
}: {
  leftButton?: ButtonProps,
  rightButton: ButtonProps,
}) => {
  const justifyContent = !!leftButton ? 'space-between' : 'flex-end'; // if there is only one button align right
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

export const SupportFooter = ({ goToPreviousStep }: { goToPreviousStep: () => void }) => {
  return (
    <Footer
      rightButton={{ text: 'Submit', variant: 'solid' }}
      leftButton={{ text: 'Utilities', onClick: goToPreviousStep }}
    />
  );
};

export const UtilitiesFooter = ({ goToPreviousStep }: { goToPreviousStep: () => void }) => {
  return (
    <Footer
      rightButton={{ text: 'Support' }}
      leftButton={{ text: 'Financials', onClick: goToPreviousStep }}
    />
  );
};

export const FinancialsFooter = ({ goToPreviousStep }: { goToPreviousStep: () => void }) => {
  return (
    <Footer
      rightButton={{ text: 'Utilities' }}
      leftButton={{ text: 'Address', onClick: goToPreviousStep }}
    />
  );
};

export const AddressFooter = ({ goToNextStep }: { goToNextStep?: () => void }) => (
  <Footer rightButton={{ text: 'Financials', onClick: goToNextStep }} />
);
