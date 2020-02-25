// @flow
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/core';
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
      <Input
        name={fieldName}
        placeholder={placeholder || label}
        ref={registerFn}
        defaultValue={defaultValue}
      />
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
  leftContent?: any,
  defaultValue?: any,
|};

export const FormNumberInput = ({
  errors,
  fieldName,
  label,
  registerFn,
  placeholder,
  step = 100,
  min = 0,
  max,
  leftContent,
  defaultValue,
  ...props
}: FormNumberInputProps) => {
  return (
    <FormField errors={errors} fieldName={fieldName} label={label} {...props}>
      <NumberInput
        step={step}
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={val => {
          console.log(val, typeof val);
        }}>
        <InputGroup>
          {leftContent ? <InputLeftAddon>{leftContent}</InputLeftAddon> : null}
          <NumberInputField
            name={fieldName}
            placeholder={placeholder || label}
            ref={registerFn}
            type="number"
          />
        </InputGroup>
      </NumberInput>
    </FormField>
  );
};
