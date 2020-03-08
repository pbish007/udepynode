import {
  ADD_HOUSE,
  FETCH_HOUSES_ERROR,
  FETCH_HOUSES_LOADING,
  FETCH_HOUSES_SUCCESS,
  UPDATE_HOUSE,
} from '../../actions/types';

const DEFAULT_STATE = {
  isLoading: false,
  error: null,
  data: null,
};

export const houseReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_HOUSE: {
      return {
        ...state,
        data: [...(state.data || []), action.payload],
      };
    }
    case UPDATE_HOUSE: {
      const updatedHouse = action.payload;
      const updatedData = (state.data || []).map(house => {
        if (house._id === updatedHouse._id) {
          return updatedHouse;
        }

        return house;
      });
      return {
        ...state,
        data: updatedData,
      };
    }
    case FETCH_HOUSES_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null,
        data: [],
      };
    }
    case FETCH_HOUSES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: [],
      };
    }
    case FETCH_HOUSES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
