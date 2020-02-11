// @flow
import type { House } from './models';
import type { ErrorMessage } from '../../models/ErrorMessage';

export type ADD_HOUSE_ACTION = {
  type: 'ADD_HOUSE',
  payload: House,
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
