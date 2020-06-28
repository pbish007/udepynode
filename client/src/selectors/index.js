// @flow
import { createSelector } from 'reselect';
import type { ReduxState } from '../models/ReduxState';
import type { House } from '../models/house';

export const selectHouses = (state: ReduxState): Array<House> | null => state.houses.data;

const selectHouseById = (state: ReduxState, houseId?: string): ?House => {
  if (!state.houses.data) {
    return null;
  }

  return state.houses.data.find((house: House) => house._id === houseId);
};
export const makeSelectHouseById = () => {
  return createSelector([selectHouseById], (house: ?House) => {
    return house;
  });
};
