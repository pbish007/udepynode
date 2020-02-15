// @flow
import axios from 'axios';
import { ROUTES } from '../constants';
import { API_ROUTES } from './apiRoutes';
import type { House, AddHouse } from '../pages/house/models';
import type {
  ADD_HOUSE_ACTION,
  FETCH_HOUSES_ERROR_ACTION,
  FETCH_HOUSES_LOADING_ACTION,
  FETCH_HOUSES_SUCCESS_ACTION,
} from '../pages/house/actions';
import type { Dispatch } from './types';
import { ADD_HOUSE, FETCH_HOUSES_ERROR, FETCH_HOUSES_LOADING, FETCH_HOUSES_SUCCESS } from './types';

export const addHouse = (values: AddHouse, history: { push: Function }) => async (
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

export const fetchHouses = () => async (dispatch: Dispatch) => {
  try {
    dispatch<FETCH_HOUSES_LOADING_ACTION>({ type: FETCH_HOUSES_LOADING });
    const res: { data: Array<House> } = await axios.get(API_ROUTES.HOUSE);

    console.log('houses', res);

    dispatch<FETCH_HOUSES_SUCCESS_ACTION>({ type: FETCH_HOUSES_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch<FETCH_HOUSES_ERROR_ACTION>({
      type: FETCH_HOUSES_ERROR,
      payload: 'Error loading houses.',
    });
    console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};
