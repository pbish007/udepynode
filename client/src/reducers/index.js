import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducers';
import surveysReducer from './surveysReducer';
import { houseReducer } from '../pages/house/reducers';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  houses: houseReducer,
});
