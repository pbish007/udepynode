// @flow

import type { House } from './models';
import type {
  ADD_HOUSE_ACTION,
  FETCH_HOUSES_ERROR_ACTION,
  FETCH_HOUSES_LOADING_ACTION,
  FETCH_HOUSES_SUCCESS_ACTION,
} from './actions';
import type { ErrorMessage } from '../../models/ErrorMessage';
import {
  ADD_HOUSE,
  FETCH_HOUSES_ERROR,
  FETCH_HOUSES_LOADING,
  FETCH_HOUSES_SUCCESS,
} from '../../actions/types';

export type HouseState = {
  isLoading: boolean,
  error: ?ErrorMessage,
  data: Array<House>,
};

const DEFAULT_STATE: HouseState = {
  isLoading: false,
  error: null,
  data: [],
};

type Action =
  | ADD_HOUSE_ACTION
  | FETCH_HOUSES_SUCCESS_ACTION
  | FETCH_HOUSES_LOADING_ACTION
  | FETCH_HOUSES_ERROR_ACTION;

export const houseReducer = (state: HouseState = DEFAULT_STATE, action: Action): HouseState => {
  switch (action.type) {
    case ADD_HOUSE: {
      return {
        ...state,
        data: [...state.data, action.payload],
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
