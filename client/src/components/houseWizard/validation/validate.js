import { ACTION_TYPES } from '../reducer';

const validateField = (validators, value, values) => {
  // console.log('values', values);
  // return validators[0](value, values);
  const errors = validators
    .map(v => {
      return v(value, values);
    })
    .filter(e => !!e);

  return errors.length ? errors[0] : null;
};

export const validate = (validations, values, dispatch) => {
  let isFormValid = true;
  validations.forEach((validators, fieldName) => {
    const value = values[fieldName];
    const error = validateField(validators, value, values);

    if (error) {
      isFormValid = false;
    }

    dispatch({
      type: ACTION_TYPES.UPDATE_ERROR,
      payload: {
        name: fieldName,
        value: error,
      },
    });
  });

  return isFormValid;
};
