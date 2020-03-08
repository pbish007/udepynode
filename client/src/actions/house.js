import axios from 'axios';
import { ROUTES } from '../constants';
import { API_ROUTES } from './apiRoutes';
import {
  ADD_HOUSE,
  FETCH_HOUSES_ERROR,
  FETCH_HOUSES_LOADING,
  FETCH_HOUSES_SUCCESS,
  UPDATE_HOUSE,
} from './types';

export const addHouse = (values, history) => async dispatch => {
  try {
    const res = await axios.post(API_ROUTES.HOUSE, values);

    console.log('res.data', res.data.meta);

    history.push(ROUTES.HOUSE);
    dispatch({ type: ADD_HOUSE, payload: res.data.meta });
  } catch (err) {
    //console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};

export const updateHouse = (houseId, values, history) => async dispatch => {
  try {
    const res = await axios.put(API_ROUTES.HOUSE, {
      _id: houseId,
      updatedHouse: values,
    });

    console.log('res.data', res.data.meta);

    history.push(ROUTES.HOUSE);
    dispatch({ type: UPDATE_HOUSE, payload: res.data.meta });
  } catch (err) {
    console.log('error updating', Object.keys(err), err);
    //console.log('error', Object.keys(err));
  }
};

export const fetchHouses = () => async dispatch => {
  try {
    dispatch({ type: FETCH_HOUSES_LOADING });
    const res = await axios.get(API_ROUTES.HOUSE);

    console.log('houses', res);

    dispatch({ type: FETCH_HOUSES_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_HOUSES_ERROR,
      payload: 'Error loading houses.',
    });
    console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};
