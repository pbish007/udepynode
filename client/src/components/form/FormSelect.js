// @flow
import React from 'react';
import type { Errors } from './types';
import { FormField } from './FormField';
import { Select } from '@chakra-ui/core';
import type {Option} from "./Option";

type FormSelectProps = {|
  errors: Errors,
  fieldName: string,
  label?: string,
  registerFn?: any,
  placeholder?: string,
  mb?: any,
  defaultValue?: any,
  options: Array<Option>,
|};

export const FormSelect = ({
  errors,
  fieldName,
  label,
  placeholder,
  registerFn,
  defaultValue,
  options,
  ...props
}: FormSelectProps) => {
  return (
    <FormField errors={errors} fieldName={fieldName} label={label} {...props}>
      <Select
        name={fieldName}
        placeholder={placeholder || label}
        ref={registerFn}
        defaultValue={defaultValue}>
        {options.map(o => {
          return (
            <option value={o.value} key={o.value}>
              {o.label}
            </option>
          );
        })}
      </Select>
    </FormField>
  );
};
