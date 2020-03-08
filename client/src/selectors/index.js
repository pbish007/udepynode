import { createSelector } from 'reselect';

export const selectHouses = state => state.houses.data;

const selectHouseById = (state, houseId) => {
  if (!state.houses.data) {
    return null;
  }

  return state.houses.data.find(house => house._id === houseId);
};

export const makeSelectHouseById = () => {
  return createSelector([selectHouseById], house => {
    return house;
  });
};
