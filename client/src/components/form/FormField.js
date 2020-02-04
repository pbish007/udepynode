// @flow
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/core';
import get from 'lodash.get';
import * as React from 'react';
import type { Errors } from '../houseWizard/types';

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

type FormInputProps = {|
  errors: Errors,
  fieldName: string,
  label?: string,
  registerFn?: any,
  placeholder?: string,
  mb?: any,
  defaultValue?: any,
|};

export const FormInput = ({
  errors,
  fieldName,
  label,
  placeholder,
  registerFn,
  defaultValue,
  ...props
}: FormInputProps) => {
  return (
    <FormField errors={errors} fieldName={fieldName} label={label} {...props}>
      <Input name={fieldName} placeholder={placeholder || label} ref={registerFn} defaultValue={defaultValue} />
    </FormField>
  );
};

type FormNumberInputProps = {|
  errors: Errors,
  fieldName: string,
  label?: string,
  registerFn?: any,
  placeholder?: string,
  step?: number,
  min?: number,
  max?: number,
  mb?: any,
|};

export const FormNumberInput = ({
  errors,
  fieldName,
  label,
  registerFn,
  placeholder,
  step = 10,
  min = 0,
  max,
  ...props
}: FormNumberInputProps) => {
  return (
    <FormField errors={errors} fieldName={fieldName} label={label} {...props}>
      <NumberInput step={step} min={min} max={max} onChange={ (val) => {console.log(val, typeof val);} }>
        <NumberInputField
          defaultValue={10}
          name={fieldName}
          placeholder={placeholder || label}
          ref={registerFn}
          type="number"
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormField>
  );
};
