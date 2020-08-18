// @flow
import React from 'react';
import { Grid, Box, Image, Checkbox } from '@chakra-ui/core';

export const ImageList = ({
  images,
  isEditMode,
}: {
  images: Array<Image>,
  isEditMode?: boolean,
}) => {
  return (
    <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 4]}>
      {images.map((image, index) => {
        return (
          <Box key={index} position="relative">
            <Image src={image.url} alt="House Image" />
            {isEditMode && (
              <Box position="absolute" top="5px" right="5px">
                <Checkbox
                  isChecked={image.isDefault}
                  border="0px solid hsl(240 50% 74%)"
                  backgroundColor="rgba(255, 255, 255, 0.5)"
                  onChange={e => console.log(e.target.checked)}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Grid>
  );
};
