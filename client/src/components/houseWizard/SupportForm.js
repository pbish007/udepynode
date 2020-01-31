// @flow
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/core';

type SupportFormProps = {|
  submitForm: Object => void,
  goToPreviousStep: boolean => void,
|};

export const SupportForm = ({ goToPreviousStep, submitForm }: SupportFormProps) => {
  return (
    <Box p={4}>
      <Flex justifyContent="space-between" pt={2}>
        <Button
          onClick={goToPreviousStep}
          type="button"
          leftIcon="arrow-back"
          variant="outline"
          mr={5}>
          Utilities
        </Button>
        <Button onClick={submitForm} type="button">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};
