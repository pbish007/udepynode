export const exists = value => {
  return value !== '' && value !== null && typeof value !== 'undefined';
};

export const required = fieldName => value =>
  exists(value) ? undefined : `Please enter a valid ${fieldName}.`;

export const fieldMatchValidator = (fieldName, message) => (value, values) => {
  const valueToMatch = values[fieldName];
  if (!values || !value || !valueToMatch) {
    return;
  }
  if (value === valueToMatch) {
    return;
  }
  return message;
};
