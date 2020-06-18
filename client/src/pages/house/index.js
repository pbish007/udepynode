// @flow
import * as React from 'react';
import { PageContent } from '../../components/PageContent';
import { ROUTES } from '../../constants';
import { connect } from 'react-redux';
import type { ReduxState } from '../../models/ReduxState';
import type { HouseState } from './reducers';
import { Spinner, Text, Flex } from '@chakra-ui/core';
import { RoundedLinkButton } from '../../components/CustomButtons/RoundedLinkButton';
import { HouseList } from './houseList';

type MapStateProps = $ReadOnly<{|
  houseData: HouseState,
|}>;

type Props = $ReadOnly<{|
  ...MapStateProps,
|}>;

// Dashboard entry page. All houses are loaded on App load, and the page shows spinner until the houses are loaded.
// See componentDidMount in components/App.js
export const HouseDashboard: React.StatelessFunctionalComponent<Props> = ({ houseData }) => {
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
    <PageContent heading="My Properties">
      <Flex mt={1} mb={1} justify="flex-end">
        <RoundedLinkButton to={ROUTES.ADD_HOUSE} icon="add" />
      </Flex>
      <HouseList houses={data} />
    </PageContent>
  );
};

const mapStateToProps = (state: ReduxState): MapStateProps => ({
  houseData: state?.houses,
});

export default connect<Props, *, MapStateProps, *, ReduxState, *>(
  mapStateToProps,
  null,
)(HouseDashboard);
