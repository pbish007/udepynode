// @flow
import { Box } from '@chakra-ui/core';
import React from 'react';
import { Footer } from './Footer';

type UtilitiesFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

export const UtilitiesForm = ({ goToNextStep, goToPreviousStep }: UtilitiesFormProps) => {
  return (
    <Box p={4}>
      <Footer
        rightButton={{ text: 'Support' }}
        leftButton={{ text: 'Financials', onClick: goToPreviousStep }}
      />
    </Box>
  );
};
