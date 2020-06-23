// @flow
export const capitalize = (str: string) => {
  if (!str) {
    return '';
  }

  return str
    .substr(0, 1)
    .toUpperCase()
    .concat(str.substr(1));
};
