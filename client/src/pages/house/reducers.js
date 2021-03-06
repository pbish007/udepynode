// @flow

import type { House } from '../../models/house';
import type {
  ADD_HOUSE_ACTION,
  DELETE_HOUSE_ACTION,
  FETCH_HOUSES_ERROR_ACTION,
  FETCH_HOUSES_LOADING_ACTION,
  FETCH_HOUSES_SUCCESS_ACTION,
  UPDATE_HOUSE_ACTION,
} from './actions';
import type { ErrorMessage } from '../../models/ErrorMessage';
import {
  ADD_HOUSE,
  DELETE_HOUSE,
  FETCH_HOUSES_ERROR,
  FETCH_HOUSES_LOADING,
  FETCH_HOUSES_SUCCESS,
  UPDATE_HOUSE,
} from '../../actions/types';

export type HouseState = {
  isLoading: boolean,
  error: ?ErrorMessage,
  data: Array<House> | null,
};

const DEFAULT_STATE: HouseState = {
  isLoading: false,
  error: null,
  data: null,
};

type Action =
  | ADD_HOUSE_ACTION
  | UPDATE_HOUSE_ACTION
  | DELETE_HOUSE_ACTION
  | FETCH_HOUSES_SUCCESS_ACTION
  | FETCH_HOUSES_LOADING_ACTION
  | FETCH_HOUSES_ERROR_ACTION;

export const houseReducer = (state: HouseState = DEFAULT_STATE, action: Action): HouseState => {
  switch (action.type) {
    case ADD_HOUSE: {
      return {
        ...state,
        data: [...(state.data || []), action.payload],
      };
    }
    case UPDATE_HOUSE: {
      const updatedHouse = action.payload;
      const updatedData = (state.data || []).map((house: House) => {
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
    case DELETE_HOUSE: {
      const id = action.payload;
      const updatedHouses = (state.data || []).filter((house: House) => {
        return house._id !== id;
      });

      return {
        ...state,
        data: updatedHouses,
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
