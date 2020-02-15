// @flow
import * as React from 'react';
import { PageContent } from '../../components/PageContent';
import { connect } from 'react-redux';
import { fetchHouses as FetchHouseData } from '../../actions/house';
import type { ReduxState } from '../../models/ReduxState';
import type { HouseState } from './reducers';
import { Spinner, Text } from '@chakra-ui/core';
import { HouseList } from './HouseList';

type MapStateProps = $ReadOnly<{|
  houseData: HouseState,
|}>;

type DispatchProps = $ReadOnly<{|
  fetchHouses: () => void,
|}>;

type Props = $ReadOnly<{|
  ...MapStateProps,
  ...DispatchProps,
|}>;

export const HouseDashboard: React.StatelessFunctionalComponent<Props> = ({
  fetchHouses,
  houseData,
}) => {
  React.useEffect(() => {
    console.log('fetching Houses');
    fetchHouses();
  }, [fetchHouses]);

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

const mapStateToProps = (state: ReduxState): MapStateProps => ({
  houseData: state?.houses,
});

const mapDispatchToProps = { fetchHouses: FetchHouseData };

//export default connect<Props, {}, MapStateProps, DispatchProps, ReduxState, *>(
export default connect<Props, {}, MapStateProps, *, ReduxState, *>(
  mapStateToProps,
  mapDispatchToProps,
)(HouseDashboard);
