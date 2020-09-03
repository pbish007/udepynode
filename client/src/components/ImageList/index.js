// @flow
import React from 'react';
import { Grid, Box, Checkbox, Image } from '@chakra-ui/core';
import type { HouseImage } from '../../models/house';
import { IconButton } from '../CustomButtons/RoundedLinkButton';

const DefaultImage = ({
  image,
  setDefault,
  deleteImage,
}: {
  image: HouseImage,
  setDefault?: string => void,
  deleteImage?: string => void,
}) => {
  return (
    <Box position="absolute" top="5px" right="5px" display="flex" alignItems="stretch">
      {!image.isDefault ? (
        <Checkbox
          borderRadius={4}
          isChecked={image.isDefault}
          marginBottom={0}
          border="0px solid #666"
          backgroundColor="rgba(255, 255, 255, 0.5)"
          padding="0 8px"
          marginRight={4}
          onChange={() => (setDefault ? setDefault(image._id) : null)}>
          Set default
        </Checkbox>
      ) : null}
      <IconButton
        icon="delete"
        onClick={() => (deleteImage ? deleteImage(image._id) : null)}
        backgroundColor="rgba(255, 255, 255, 0.5)"
        _hover={{ bg: 'rgba(255, 255, 255, 0.5)' }}
      />
    </Box>
  );
};

export const ImageList = ({
  images,
  isEditMode,
  setDefault,
  deleteImage,
}: {
  images: Array<HouseImage>,
  isEditMode?: boolean,
  setDefault?: string => void,
  deleteImage?: string => void,
}) => {
  return (
    <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[4, null, 4]}>
      {images.map((image, index) => {
        return (
          <Box key={index} position="relative">
            <Image src={image.url} alt="House Image" />
            {isEditMode && (
              <DefaultImage image={image} setDefault={setDefault} deleteImage={deleteImage} />
            )}
          </Box>
        );
      })}
    </Grid>
  );
};
