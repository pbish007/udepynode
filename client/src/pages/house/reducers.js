// @flow

import type { House } from './models';
import type { ADD_HOUSE_ACTION } from './types';
import type { Error } from '../../models/Error';

type State = {
  isLoading: boolean,
  error: ?Error,
  data: Array<House>,
};

const DEFAULT_STATE: State = {
  isLoading: false,
  error: null,
  data: [],
};

export const HouseReducer = (state: State = DEFAULT_STATE, action: ADD_HOUSE_ACTION) => {};
