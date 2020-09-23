// @flow
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import * as React from 'react';
import { Box, Image } from '@chakra-ui/core';

type StreetMapProps = $Shape<{
  location: ?{ lat: string, lng: string },
  size?: string,
  [string]: any,
}>;

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
