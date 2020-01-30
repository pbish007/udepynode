import React from 'react';
import Proptypes from 'prop-types';
import { Box, Input, Grid, Button, Flex } from '@chakra-ui/core';
import { FormField } from './AddressForm';

const ADDRESS1_FIELD = 'address.street111';

export const SupportForm = ({ register, errors, goToPreviousStep, submitForm }) => {
  return (
    <Box p={4}>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
        <Box>
          <FormField errors={errors} fieldName={ADDRESS1_FIELD} label="Test">
            <Input
              name={ADDRESS1_FIELD}
              placeholder="Test"
              ref={register({ required: 'Street is required' })}
            />
          </FormField>
        </Box>
      </Grid>

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

SupportForm.propTypes = {
  register: Proptypes.func,
  errors: Proptypes.object,
  goToPreviousStep: Proptypes.func,
  submitForm: Proptypes.func,
};
