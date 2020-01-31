// @flow
import { Box, Button, Flex } from '@chakra-ui/core';
import Proptypes from 'prop-types';
import React from 'react';

type UtilitiesFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

export const UtilitiesForm = ({ goToNextStep, goToPreviousStep }: UtilitiesFormProps) => {
  return (
    <Box p={4}>
      <Flex justifyContent="space-between" pt={2}>
        <Button
          onClick={goToPreviousStep}
          type="button"
          leftIcon="arrow-back"
          variant="outline"
          mr={5}>
          Financials
        </Button>
        <Button onClick={goToNextStep} type="button" rightIcon="arrow-forward" variant="outline">
          Support
        </Button>
      </Flex>
    </Box>
  );
};

UtilitiesForm.propTypes = {
  register: Proptypes.func,
  errors: Proptypes.object,
  goToNextStep: Proptypes.func,
  goToPreviousStep: Proptypes.func,
};
