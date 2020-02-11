// @flow
import * as React from 'react';
import type { House } from './models';
import { Flex, Grid, Icon, Text } from '@chakra-ui/core';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';

type Props = {
  houses: Array<House>,
};

const cardProps = {
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px',
  borderColor: 'gray.300',
  borderRadius: 2,
  height: 40,
  shadow: 'md',
};

export const AddHouseCard = () => {
  return (
    <Link to={ROUTES.ADD_HOUSE}>
      <Flex {...cardProps} direction="column">
        <Icon name="add" size="48px" />
        <Text fontWeight="bold" mt={4}>
          Add New
        </Text>
      </Flex>
    </Link>
  );
};

export const HouseList: React.StatelessFunctionalComponent<Props> = ({ houses }) => {
  return (
    <React.Fragment>
      <Text fontSize={28} mb={8} textAlign="center">
        House Dashboard
      </Text>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
        gap={[0, null, 4]}>
        <AddHouseCard />
      </Grid>
    </React.Fragment>
  );
};
