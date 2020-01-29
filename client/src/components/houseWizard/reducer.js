export const ACTION_TYPES = {
  UPDATE_VALUE: 'UPDATE_VALUE',
  UPDATE_ERROR: 'UPDATE_ERROR',
};

export const setErrorAction = (fieldName, error) => {
  return {
    type: ACTION_TYPES.UPDATE_ERROR,
    payload: {
      name: fieldName,
      value: error,
    },
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE': {
      const { name, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    }
    case 'UPDATE_ERROR': {
      const { name, value } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: value,
        },
      };
    }
  }
};
