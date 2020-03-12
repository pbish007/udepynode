// @flow
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import * as React from 'react';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { Box, Image } from '@chakra-ui/core';

type StreetMapProps = $Shape<{
  location: ?{ lat: string, lng: string },
  size?: string,
  [string]: any,
}>;

const DEFAULT_MAP_SIZE = '400x400';

export const StaticStreetMap = ({ location, size, ...props }: StreetMapProps) => {
  if (!location) {
    return null;
  }
  return (
    <Box {...props}>
      <Image
        size={size}
        alt="Street View"
        src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${location.lat},${location.lng}&fov=80&key=${GOOGLE_MAPS_API_KEY}`}
      />
    </Box>
  );
};

type MapProps = $Shape<{
  location: ?{ lat: string, lng: string },
  size: string,
  [string]: any,
}>;

export const StaticMap = ({ location, size = DEFAULT_MAP_SIZE, ...props }: MapProps) => {
  if (!location) {
    return null;
  }

  return (
    <Box {...props}>
      <StaticGoogleMap size={size} className="img-fluid" apiKey={GOOGLE_MAPS_API_KEY}>
        <Marker location={`${location.lat},${location.lng}`} color="blue" label="P" />
      </StaticGoogleMap>
    </Box>
  );
};
