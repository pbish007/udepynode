// @flow
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import get from 'lodash.get';
import * as React from 'react';
import type { Errors } from './types';

type FormFieldProps = {|
  errors: Errors,
  fieldName: string,
  label?: string,
  children: React.Node,
  mb?: any,
|};

export const FormField = ({ errors, fieldName, label, children, mb = 1 }: FormFieldProps) => {
  return (
    <FormControl isInvalid={get(errors, fieldName)} mb={mb}>
      {!!label && (
        <FormLabel htmlFor={fieldName} mb={0}>
          {label}
        </FormLabel>
      )}
      {children}
      <FormErrorMessage>{get(errors, `${fieldName}.message`)}</FormErrorMessage>
    </FormControl>
  );
};
