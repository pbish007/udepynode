// @flow
import * as React from 'react';
import type { House } from '../models';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/core';
import { ROUTES } from '../../../constants';
import { StyledLink } from '../../../components/StyledLink';
import { ValueCard } from './ValueCard';
import { AddHouseButtonWithText } from './AddHouseButton';

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

export const HouseCard = ({ house }: { house: House }) => {
  const route = `${ROUTES.HOUSE}/view/${house._id}`;

  return (
    <StyledLink to={route}>
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
    </StyledLink>
  );
};

export const HouseList: React.StatelessFunctionalComponent<Props> = ({ houses }) => {
  return (
    <React.Fragment>
      <Flex mt={6} mb={6} justify="flex-end">
        <AddHouseButtonWithText />
      </Flex>
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