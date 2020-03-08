import * as React from 'react';
import { Button, Flex } from '@chakra-ui/core';

export const Footer = ({ leftButton, rightButton }) => {
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

export const SupportFooter = ({ goToPreviousStep }) => {
  return (
    <Footer
      rightButton={{ text: 'Submit', variant: 'solid' }}
      leftButton={{ text: 'Utilities', onClick: goToPreviousStep }}
    />
  );
};

export const UtilitiesFooter = ({ goToPreviousStep }) => {
  return (
    <Footer
      rightButton={{ text: 'Support' }}
      leftButton={{ text: 'Financials', onClick: goToPreviousStep }}
    />
  );
};

export const FinancialsFooter = ({ goToPreviousStep }) => {
  return (
    <Footer
      rightButton={{ text: 'Utilities' }}
      leftButton={{ text: 'Address', onClick: goToPreviousStep }}
    />
  );
};

export const AddressFooter = ({ goToNextStep }) => (
  <Footer rightButton={{ text: 'Financials', onClick: goToNextStep }} />
);
