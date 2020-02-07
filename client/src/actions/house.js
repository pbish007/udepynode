import axios from 'axios';
import { ADD_HOUSE } from './types';

export const addHouse = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/house', values);

    console.log('response');

    history.push('/house');
    dispatch({ type: ADD_HOUSE, payload: res.data });
  } catch (err) {
    console.log('error adding', Object.keys(err), err.toJSON());
    //console.log('error', Object.keys(err));
  }
};
