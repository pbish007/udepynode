import { useEffect, useReducer } from 'react';
import * as React from 'react';

import { ACTION_TYPES, reducer } from './reducer';
import { validate } from './validation/validate';

export const useForm = initialValue => {
  const [formState, dispatch] = useReducer(reducer, initialValue);
  const [hasSubmitAttempted, setFormSubmitAttempted] = React.useState(false);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { values, validations } = formState;

  useEffect(() => {
    if (hasSubmitAttempted) {
      validate(validations, values, dispatch);
    }
  }, [values, validations, hasSubmitAttempted]);

  const handleChange = (name, value) => {
    dispatch({ type: ACTION_TYPES.UPDATE_VALUE, payload: { name, value } });
  };

  const handleSubmit = onSubmit => async e => {
    e.preventDefault();
    setFormSubmitAttempted(true);
    const isFormValid = validate(validations, values, dispatch);

    if (isFormValid && onSubmit) {
      setSubmitting(true);
      await onSubmit(formState);
      // setSubmitting(false);
    }
  };

  return { ...formState, handleChange, handleSubmit, isSubmitting, setSubmitting, dispatch };
};
