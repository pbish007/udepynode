// @flow
import * as React from 'react';
import type { House } from '../../../models/house';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/core';
import { getHouseDetailsRoute } from '../../../constants';
import { StyledRouterLink } from '../../../components/StyledLink';
import { ValueCard } from './ValueCard';
import { fetchLocationFromAddress } from '../../../api/map';
import { StaticStreetMap } from '../../../components/Map';

type Props = {
  houses: ?Array<House>,
};

const cardProps = {
  border: '1px',
  borderColor: 'gray.100',
  bg: 'blackAlpha.50',
  borderRadius: 2,
  height: 40,
  shadow: 'lg',
  direction: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  p: 2,
  _hover: { textDecoration: 'none' },
};

const ThumbnailImage = ({
  defaultImage,
  location,
}: {
  defaultImage: Image,
  location: { lat: string, lng: string } | null,
}) => {
  if (defaultImage) {
    return <Image size="70px" objectFit="cover" src={defaultImage.url} alt="Placeholder image" />;
  }

  return location ? (
    <StaticStreetMap location={location} size="70px" />
  ) : (
    <Image
      size="70px"
      objectFit="cover"
      src="https://via.placeholder.com/150"
      alt="Placeholder image"
    />
  );
};

const getDefaultImage = (images?: ?Array<Image>): Image | null => {
  if (!images || !images.length) {
    return null;
  }
  const defaultImage = images.find((image: Image) => image.isDefault);

  if (defaultImage) {
    return defaultImage;
  }

  return images[0];
};

export const HouseCard = ({ house }: { house: House }) => {
  const [location, setLocation] = React.useState<{ lat: string, lng: string } | null>(null);
  const route = getHouseDetailsRoute(house._id);

  React.useEffect(() => {
    fetchLocationFromAddress({ address: house.address }).then(locationData => {
      if (locationData) {
        setLocation(locationData);
      }
    });
  }, [house.address]);

  const {
    address: { images },
  } = house;

  const defaultImage = getDefaultImage(images);

  console.log('defaultImage', defaultImage);

  return (
    <StyledRouterLink to={route}>
      <Flex
        {...cardProps}
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
        p={2}>
        <Flex direction="row" justify="space-between">
          <ThumbnailImage defaultImage={defaultImage} location={location} />

          <Box fontSize="sm" flex={1} ml="2.25rem">
            <Text>{house.address.street}</Text>
            <Text>
              {house.address.city}, {house.address.state}
            </Text>
            <Text>
              {house.address.zip}, {house.address.country}
            </Text>
          </Box>
        </Flex>
        <Grid templateColumns={'repeat(3, 1fr)'} gap={4}>
          <ValueCard label="Asset Value" value={house.financials.assetValue} />
          <ValueCard label="Liability" value={house.financials.mortgage} />
          <ValueCard
            label="Equity"
            value={house.financials.assetValue - house.financials.mortgage}
          />
        </Grid>
      </Flex>
    </StyledRouterLink>
  );
};

export const HouseList: React.StatelessFunctionalComponent<Props> = ({ houses }) => {
  return (
    <React.Fragment>
      {houses && houses.length ? (
        <Grid
          templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
          gap={[4, 6]}>
          {houses.map((house: House) => {
            return <HouseCard key={house._id} house={house} />;
          })}
        </Grid>
      ) : null}
    </React.Fragment>
  );
};
