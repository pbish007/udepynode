import axios from 'axios';
import { ADD_HOUSE } from './types';

export const addHouse = (values, history) => async dispatch => {
  const res = await axios.post('/api/house', values);

  console.log('response', res);

  history.push('/house');
  dispatch({ type: ADD_HOUSE, payload: res.data });
};
