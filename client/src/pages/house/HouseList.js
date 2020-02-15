// @flow
import * as React from 'react';
import type { House } from './models';
import { Box, Flex, Grid, Icon, Image, Text } from '@chakra-ui/core';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

type Props = {
  houses: Array<House>,
};

const cardProps = {
  borderTop: '1px',
  borderColor: 'gray.100',
  borderRadius: 2,
  height: 40,
  shadow: 'lg',
  direction: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  p: 2,
  _hover: { textDecoration: 'none' },
};

const ValueCard: React.StatelessFunctionalComponent<{ label: string, value: number }> = ({
  label,
  value,
}) => {
  return (
    <Flex p={1} direction="column" bg="blackAlpha.200" align="center" borderRadius={4}>
      <Text mb={0} fontSize="sm" fontWeight={600}>
        {label}
      </Text>
      <Text fontSize="sm">£{value}</Text>
    </Flex>
  );
};

const StyledLink: React.StatelessFunctionalComponent<any> = styled(Link)`
  &:hover {
    text-decoration: none;
    color: inherit;
    opacity: 0.9;
  }
`;

export const HouseCard = ({ house }: { house: House }) => {
  const route = `${ROUTES.HOUSE}/view/${house._id}`;

  return (
    <StyledLink to={route}>
      <Flex
        {...cardProps}
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
        p={2}
        _hover={{ textDecoration: 'none' }}>
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

const buttonProps = {
  display: 'inline-flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px',
  borderColor: 'blackAlpha.200',
  boxShadow: 'md',
  bg: 'blackAlpha.800',
  color: 'whiteAlpha.800',
  height: '48px',
};

export const AddHouseButton = (props: any) => {
  return (
    <StyledLink to={ROUTES.ADD_HOUSE}>
      <Box {...buttonProps} p={2} borderRadius="50%" mt={4} mb={4} width="48px" {...props}>
        <React.Fragment>
          <Icon name="add" />
        </React.Fragment>
      </Box>
    </StyledLink>
  );
};

export const AddHouseButtonWithText = () => {
  return (
    <StyledLink to={ROUTES.ADD_HOUSE}>
      <Box {...buttonProps} p={4} borderRadius="24px" mt={4} mb={4} width="auto">
        <React.Fragment>Add New</React.Fragment>
      </Box>
    </StyledLink>
  );
};

export const HouseList: React.StatelessFunctionalComponent<Props> = ({ houses }) => {
  return (
    <React.Fragment>
      <Flex>
        <AddHouseButton mr={2} />
        <AddHouseButtonWithText />
      </Flex>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
        gap={[4, 6]}>
        {houses.map((house: House) => {
          return <HouseCard key={house._id} house={house} />;
        })}
      </Grid>
    </React.Fragment>
  );
};
