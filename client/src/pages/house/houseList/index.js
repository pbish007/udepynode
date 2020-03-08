import * as React from 'react';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/core';
import { getHouseDetailsRoute, ROUTES } from '../../../constants';
import { StyledRouterLink } from '../../../components/StyledLink';
import { ValueCard } from './ValueCard';
import { RoundedLinkButton } from '../../../components/CustomButtons/RoundedLinkButton';

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

export const HouseCard = ({ house }) => {
  const route = getHouseDetailsRoute(house._id);

  return (
    <StyledRouterLink to={route}>
      <Flex
        {...cardProps}
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
        p={2}>
        <Flex direction="row" justify="space-between">
          <Image
            size="70px"
            objectFit="cover"
            src="https://loremflickr.com/150/200/house"
            fallbackSrc="https://via.placeholder.com/150"
            alt="Placeholder image"
          />
          <Box fontSize="sm" flex={1} ml="2.25rem">
            <Text>{house.address.street}</Text>
            <Text>{house.address.city}</Text>
            <Text>
              {house.address.zip}, {house.address.country}
            </Text>
          </Box>
        </Flex>
        <Grid templateColumns={'repeat(3, 1fr)'} gap={4}>
          <ValueCard label="Estimate" value={60000} />
          <ValueCard label="Liability" value={30000} />
          <ValueCard label="Equity" value={30000} />
        </Grid>
      </Flex>
    </StyledRouterLink>
  );
};

export const HouseList = ({ houses }) => {
  return (
    <React.Fragment>
      <Flex mt={6} mb={6} justify="flex-end">
        <RoundedLinkButton to={ROUTES.ADD_HOUSE} text="Add New" icon="add" />
      </Flex>
      {houses && houses.length ? (
        <Grid
          templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
          gap={[4, 6]}>
          {houses.map(house => {
            return <HouseCard key={house._id} house={house} />;
          })}
        </Grid>
      ) : null}
    </React.Fragment>
  );
};
