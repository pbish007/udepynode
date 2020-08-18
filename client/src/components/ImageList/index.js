// @flow
import React from 'react';
import { Grid, Box, Image } from '@chakra-ui/core';

export const ImageList = ({ images }: { images: Array<Image> }) => {
  return (
    <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']} gap={[0, null, 4]}>
      {images.map((image, index) => {
        return (
          <Box key={index}>
            <Image src={image.url} alt="House Image" />
          </Box>
        );
      })}
    </Grid>
  );
};
