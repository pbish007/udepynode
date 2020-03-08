import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '../constants';

const getGeocodingUrl = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;

export const fetchLocationFromAddress = async address => {
  const {
    address: { street, city, zip, country },
  } = address;
  const stringifiedAddress = encodeURI(`${street} ${city} ${zip} ${country}`);
  const url = getGeocodingUrl(stringifiedAddress);

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
