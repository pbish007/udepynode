// @flow
import { Input, InputGroup, InputLeftAddon, NumberInput, NumberInputField } from '@chakra-ui/core';
import React from 'react';
import type { Errors } from './types';
import { FormField } from './FormField';

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
