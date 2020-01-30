import React from 'react';
import Proptypes from 'prop-types';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/core';
import { exists } from './validation/rules';
import get from 'lodash.get';

function validateName(value) {
  let error;
  if (!exists(value)) {
    error = 'Name is required';
  }
  return error || true;
}

const ADDRESS1_FIELD = 'address.street';

// eslint-disable-next-line react/prop-types
const FormField = ({ errors, fieldName, label, children }) => {
  return (
    <FormControl isInvalid={get(errors, fieldName)}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{get(errors, `${fieldName}.message`)}</FormErrorMessage>
    </FormControl>
  );
};

export const AddressForm = ({ register, errors, goToNextStep }) => {
  console.log('values', get(errors, ADDRESS1_FIELD));
  return (
    <Box p={4}>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
        <Box>
          <FormField errors={errors} fieldName={ADDRESS1_FIELD} label="Street">
            <Input
              name={ADDRESS1_FIELD}
              placeholder="Street"
              ref={register({ required: 'Street is required' })}
            />
          </FormField>
        </Box>
      </Grid>

      <Flex justifyContent="flex-end" pt={2}>
        <Button onClick={goToNextStep} type="button" rightIcon="arrow-forward" variant="outline">
          Financials
        </Button>
      </Flex>
    </Box>
  );
};

AddressForm.propTypes = {
  register: Proptypes.func,
  goToNextStep: Proptypes.func,
  errors: Proptypes.object,
};
