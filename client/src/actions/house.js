// @flow
import axios from 'axios';
import { ROUTES } from '../constants';
import { API_ROUTES } from './apiRoutes';
import type { House, AddHouse, Address } from '../models/house';
import type {
  ADD_HOUSE_ACTION,
  DELETE_HOUSE_ACTION,
  FETCH_HOUSES_ERROR_ACTION,
  FETCH_HOUSES_LOADING_ACTION,
  FETCH_HOUSES_SUCCESS_ACTION,
  UPDATE_HOUSE_ACTION,
} from '../pages/house/actions';
import type { Dispatch } from './types';
import {
  ADD_HOUSE,
  DELETE_HOUSE,
  FETCH_HOUSES_ERROR,
  FETCH_HOUSES_LOADING,
  FETCH_HOUSES_SUCCESS,
  UPDATE_HOUSE,
} from './types';

export const addHouse = (values: AddHouse<string>, history: { push: Function }) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: { meta: House } } = await axios.post(API_ROUTES.HOUSE, values);

    console.log('res.data', res.data.meta);

    history.push(ROUTES.HOUSE);
    dispatch<ADD_HOUSE_ACTION>({ type: ADD_HOUSE, payload: res.data.meta });
  } catch (err) {
    //console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};

export const updateHouse = (houseId: string, values: House, history: { push: Function }) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: { meta: House } } = await axios.put(API_ROUTES.HOUSE, {
      _id: houseId,
      updatedHouse: values,
    });

    console.log('res.data', res.data.meta);

    history.push(ROUTES.HOUSE);
    dispatch<UPDATE_HOUSE_ACTION>({ type: UPDATE_HOUSE, payload: res.data.meta });
  } catch (err) {
    console.log('error updating', Object.keys(err), err);
    //console.log('error', Object.keys(err));
  }
};

export const deleteHouse = (houseId: string, history: { push: Function }) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: { success: boolean } } = await axios.delete(API_ROUTES.HOUSE, {
      data: {
        _id: houseId,
      },
    });

    console.log('response', res.data.success);

    history.push(ROUTES.HOUSE);
    dispatch<DELETE_HOUSE_ACTION>({ type: DELETE_HOUSE, payload: houseId });
  } catch (err) {
    console.log('error deleting', Object.keys(err), err);
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

export const addHouseImage = (
  houseId: string,
  address: Address,
  imageUrl: string,
  toast: Function,
) => async (dispatch: Dispatch) => {
  try {
    const res: { data: { meta: House } } = await axios.patch(API_ROUTES.ADD_IMAGE, {
      _id: houseId,
      address,
      imageUrl,
    });

    console.log('res.data', res.data.meta);

    toast({
      title: 'Image uploaded',
      description: 'The image has been successfully uploaded.',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });

    dispatch<UPDATE_HOUSE_ACTION>({ type: UPDATE_HOUSE, payload: res.data.meta });
  } catch (err) {
    console.log('error updating', Object.keys(err), err);
    //console.log('error', Object.keys(err));
  }
};

export const setDefaultHouseImage = (houseId: string, imageId: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: { meta: House } } = await axios.patch(API_ROUTES.SET_DEFAULT_IMAGE, {
      _id: houseId,
      imageId,
    });

    console.log('res.data', res.data.meta);

    dispatch<UPDATE_HOUSE_ACTION>({ type: UPDATE_HOUSE, payload: res.data.meta });
  } catch (err) {
    console.log('error updating', Object.keys(err), err);
    //console.log('error', Object.keys(err));
  }
};

export const deleteHouseImage = (houseId: string, imageId: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const res: { data: { meta: House } } = await axios.patch(API_ROUTES.DELETE_IMAGE, {
      _id: houseId,
      imageId,
    });

    console.log('res.data', res.data.meta);

    dispatch<UPDATE_HOUSE_ACTION>({ type: UPDATE_HOUSE, payload: res.data.meta });
  } catch (err) {
    console.log('error updating', Object.keys(err), err);
    //console.log('error', Object.keys(err));
  }
};
