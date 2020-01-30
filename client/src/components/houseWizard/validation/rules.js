export const exists = value => {
  return value !== '' && value !== null && typeof value !== 'undefined';
};
