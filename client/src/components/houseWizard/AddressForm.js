import React from 'react';
import Proptypes from 'prop-types';
import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';
import { exists } from './validation/rules';
import get from 'lodash.get';

function validateName(value) {
  let error;
  if (!exists(value)) {
    error = 'Name is required';
  }
  return error || true;
}

const FIELD_NAME = 'address.street';

export const AddressForm = ({ register, errors }) => {
  console.log('values', get(errors, FIELD_NAME));
  return (
    <Box p="10px">
      <FormControl isInvalid={get(errors, FIELD_NAME)}>
        <FormLabel htmlFor={FIELD_NAME}>Street</FormLabel>
        <Input
          name={FIELD_NAME}
          placeholder="Street"
          ref={register({ required: 'Street is required' })}
        />
        <FormErrorMessage>
          {get(errors, FIELD_NAME) && get(errors, FIELD_NAME).message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

AddressForm.propTypes = {
  register: Proptypes.func,
  errors: Proptypes.object,
};
