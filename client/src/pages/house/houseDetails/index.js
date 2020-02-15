// @flow
import * as React from 'react';
import { PageContent } from '../../../components/PageContent';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import { makeSelectHouseById, selectHouses } from '../../../selectors';
import type { House } from '../models';

type OwnProps = {
  match: { params: { houseId?: string } },
};

type MapStateProps = $ReadOnly<{|
  house: ?House,
  houses: ?Array<House>,
|}>;

type Props = {
  ...OwnProps,
  ...MapStateProps,
};

const HouseDetails: React.StatelessFunctionalComponent<Props> = ({ house }) => {
  console.log('house details', house);
  return <PageContent heading="House Details">House Details - {house?._id}</PageContent>;
};

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): MapStateProps => {
  const selectHouseById = makeSelectHouseById();

  return {
    houses: selectHouses(state),
    house: selectHouseById(state, ownProps.match.params.houseId),
  };
};

export default connect<Props, *, MapStateProps, *, ReduxState, *>(
  mapStateToProps,
  null,
)(HouseDetails);
