// @flow
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import * as React from 'react';
import { Box, Checkbox, Image } from '@chakra-ui/core';

type StreetMapProps = $Shape<{
  location: ?{ lat: string, lng: string },
  canSetDefault?: boolean,
  isDefault?: boolean,
  setDefault: () => void,
  size?: string,
  [string]: any,
}>;

export const StaticStreetMap = ({
  location,
  size,
  canSetDefault,
  isDefault,
  setDefault,
  ...props
}: StreetMapProps) => {
  if (!location) {
    return null;
  }
  return (
    <Box {...props} position="relative">
      {canSetDefault && !isDefault ? (
        <Box position="absolute" top="5px" left="5px" display="flex" alignItems="stretch">
          <Checkbox
            borderRadius={4}
            isChecked={isDefault}
            marginBottom={0}
            border="0px solid #666"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            padding="0 8px"
            marginRight={4}
            onChange={setDefault}>
            Set default
          </Checkbox>
        </Box>
      ) : null}
      <Image
        size={size}
        alt="Street View"
        src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${location.lat},${location.lng}&fov=80&key=${GOOGLE_MAPS_API_KEY}`}
      />
    </Box>
  );
};
