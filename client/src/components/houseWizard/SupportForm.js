// @flow
import React from 'react';
import { Box } from '@chakra-ui/core';
import { Footer } from './Footer';

type SupportFormProps = {|
  submitForm: Object => void,
  goToPreviousStep: boolean => void,
|};

export const SupportForm = ({ goToPreviousStep, submitForm }: SupportFormProps) => {
  return (
    <Box p={4}>
      <Footer
        rightButton={{ text: 'Submit', onClick: submitForm, type: 'button' }}
        leftButton={{ text: 'Utilities', onClick: goToPreviousStep }}
      />
    </Box>
  );
};
