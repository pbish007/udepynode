import { Box, Button, Flex } from '@chakra-ui/core';
import Proptypes from 'prop-types';
import React from 'react';

export const FinancialsForm = ({ register, errors, goToNextStep, goToPreviousStep }) => {
  return (
    <Box p={4}>
      <Flex justifyContent="space-between" pt={2}>
        <Button
          onClick={goToPreviousStep}
          type="button"
          leftIcon="arrow-back"
          variant="outline"
          mr={5}>
          Address
        </Button>
        <Button onClick={goToNextStep} type="button" rightIcon="arrow-forward" variant="outline">
          Utilities
        </Button>
      </Flex>
    </Box>
  );
};

FinancialsForm.propTypes = {
  register: Proptypes.func,
  errors: Proptypes.object,
  goToNextStep: Proptypes.func,
  goToPreviousStep: Proptypes.func,
};
