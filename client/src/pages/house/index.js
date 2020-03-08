import * as React from 'react';
import { PageContent } from '../../components/PageContent';
import { connect } from 'react-redux';
import { Spinner, Text } from '@chakra-ui/core';
import { HouseList } from './houseList';

export const HouseDashboard = ({ houseData }) => {
  const { data, error, isLoading } = houseData;

  if (isLoading) {
    return (
      <PageContent>
        <Spinner />
      </PageContent>
    );
  }

  if (error) {
    return (
      <PageContent>
        <Text>Error fetching house data.</Text>
      </PageContent>
    );
  }

  return (
    <PageContent heading="House Dashboard">
      <HouseList houses={data} />
    </PageContent>
  );
};

const mapStateToProps = state => ({
  houseData: state?.houses,
});

export default connect(mapStateToProps, null)(HouseDashboard);
