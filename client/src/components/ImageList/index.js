// @flow
import React from 'react';
import { Grid, Box, Checkbox, Image } from '@chakra-ui/core';
import type { HouseImage } from '../../models/house';

const DefaultImage = ({
  image,
  setDefault,
}: {
  image: HouseImage,
  setDefault?: string => void,
}) => {
  return !image.isDefault ? (
    <Box position="absolute" top="5px" right="5px">
      <Checkbox
        isChecked={image.isDefault}
        border="0px solid hsl(240 50% 74%)"
        backgroundColor="rgba(255, 255, 255, 0.5)"
        onChange={() => (setDefault ? setDefault(image._id) : null)}>
        Set default
      </Checkbox>
    </Box>
  ) : null;
};

export const ImageList = ({
  images,
  isEditMode,
  setDefault,
}: {
  images: Array<HouseImage>,
  isEditMode?: boolean,
  setDefault?: string => void,
}) => {
  return (
    <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 4]}>
      {images.map((image, index) => {
        return (
          <Box key={index} position="relative">
            <Image src={image.url} alt="House Image" />
            {isEditMode && <DefaultImage image={image} setDefault={setDefault} />}
          </Box>
        );
      })}
    </Grid>
  );
};
