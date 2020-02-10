// @flow
import axios from 'axios';
import { ROUTES } from '../constants';
import { API_ROUTES } from './apiRoutes';
import type { House } from '../pages/house/models';
import type { ADD_HOUSE_ACTION } from '../pages/house/types';
import type { Dispatch } from './types';
import { ADD_HOUSE } from './types';

export const addHouse = (values: House, history: { push: Function }) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: House } = await axios.post(API_ROUTES.HOUSE, values);

    history.push(ROUTES.HOUSE);
    dispatch<ADD_HOUSE_ACTION>({ type: ADD_HOUSE, payload: res.data });
  } catch (err) {
    console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};
