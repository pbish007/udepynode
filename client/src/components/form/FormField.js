// @flow
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import get from 'lodash.get';
import * as React from 'react';
import type { Errors } from '../houseWizard/types';

type FormFieldProps = {|
  errors: Errors,
  fieldName: string,
  label: string,
  children: React.Node,
|};

export const FormField = ({ errors, fieldName, label, children }: FormFieldProps) => {
  return (
    <FormControl isInvalid={get(errors, fieldName)} mb={1}>
      <FormLabel htmlFor={fieldName} mb={0}>
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage>{get(errors, `${fieldName}.message`)}</FormErrorMessage>
    </FormControl>
  );
};

type FormInputProps = {|
  errors: Errors,
  fieldName: string,
  label: string,
  registerFn: any,
  placeholder?: string,
|};

export const FormInput = ({
  errors,
  fieldName,
  label,
  placeholder,
  registerFn,
}: FormInputProps) => {
  return (
    <FormField errors={errors} fieldName={fieldName} label={label}>
      <Input name={fieldName} placeholder={placeholder || label} ref={registerFn} />
    </FormField>
  );
};
