// @flow
import * as React from 'react';
import { PageContent } from '../../components/PageContent';
import { connect } from 'react-redux';
import { fetchHouses } from '../../actions/house';

export const HouseDashboard = ({ fetchHouses }: { fetchHouses: () => void }) => {
  React.useEffect(() => {
    console.log('fetching Houses');
    fetchHouses();
  });
  return <PageContent>House Dashboard</PageContent>;
};
export default connect(null, { fetchHouses })(HouseDashboard);
