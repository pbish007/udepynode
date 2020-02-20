// @flow
export const ROUTES = {
  ADD_HOUSE: '/house/add',
  HOUSE: '/house',
  HOUSE_DETAILS: '/house/view/:houseId',
  HOUSE_EDIT: '/house/edit/:houseId',
};

export const getHouseDetailsRoute = (id: string) => `${ROUTES.HOUSE}/view/${id}`;
export const getHouseEditRoute = (id: string) => `${ROUTES.HOUSE}/edit/${id}`;
