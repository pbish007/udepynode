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

export const FormField = ({ errors, fieldName, label, children, mb = 1 }) => {
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

export const FormInput = ({
  errors,
  fieldName,
  label,
  placeholder,
  registerFn,
  defaultValue,
  ...props
}) => {
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
}) => {
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
