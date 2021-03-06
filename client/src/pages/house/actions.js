// @flow
import type { House } from '../../models/house';
import type { ErrorMessage } from '../../models/ErrorMessage';

export type ADD_HOUSE_ACTION = {
  type: 'ADD_HOUSE',
  payload: House,
};

export type UPDATE_HOUSE_ACTION = {
  type: 'UPDATE_HOUSE',
  payload: House,
};

export type DELETE_HOUSE_ACTION = {
  type: 'DELETE_HOUSE',
  payload: string,
};

export type FETCH_HOUSES_SUCCESS_ACTION = {
  type: 'FETCH_HOUSES_SUCCESS',
  payload: Array<House>,
};

export type FETCH_HOUSES_LOADING_ACTION = {
  type: 'FETCH_HOUSES_LOADING',
};

export type FETCH_HOUSES_ERROR_ACTION = {
  type: 'FETCH_HOUSES_ERROR',
  payload: ErrorMessage,
};
