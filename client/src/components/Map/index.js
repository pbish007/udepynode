import { GOOGLE_MAPS_API_KEY } from '../../constants';
import * as React from 'react';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { Box } from '@chakra-ui/core';

export const StaticStreetMap = ({ location, ...props }) => {
  if (!location) {
    return null;
  }
  return (
    <Box {...props}>
      <img
        alt="Street View"
        src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${location.lat},${location.lng}&fov=80&key=${GOOGLE_MAPS_API_KEY}`}
      />
    </Box>
  );
};

export const StaticMap = ({ location, ...props }) => {
  if (!location) {
    return null;
  }

  return (
    <Box {...props}>
      <StaticGoogleMap size="400x400" className="img-fluid" apiKey={GOOGLE_MAPS_API_KEY}>
        <Marker location={`${location.lat},${location.lng}`} color="blue" label="P" />
      </StaticGoogleMap>
    </Box>
  );
};
