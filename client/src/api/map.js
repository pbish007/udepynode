// @flow
import axios from 'axios';
import type { AddressFormModel } from '../pages/house/addHouse/AddressForm';
import { GOOGLE_MAPS_API_KEY } from '../constants';

const getGeocodingUrl = (address: string) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;

export const fetchLocationFromAddress = async (
  address: AddressFormModel,
): Promise<{ lat: string, lng: string } | null> => {
  const {
    address: { street, city, zip, country },
  } = address;
  const stringifiedAddress = encodeURI(`${street} ${city} ${zip} ${country}`);
  const url = getGeocodingUrl(stringifiedAddress);

  console.log('stringifiedAddress', stringifiedAddress);

  const {
    data: { results },
  } = await axios.get(url);

  if (!results.length) {
    return null;
  }

  const {
    geometry: { location },
  } = results[0];
  console.log('location', location);

  return location;
};
