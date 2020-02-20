// @flow
import * as React from 'react';
import { PageContent } from '../../../components/PageContent';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import { makeSelectHouseById, selectHouses } from '../../../selectors';
import type { House } from '../models';
import { useTabStep } from '../useTabStep';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import { AddressDetails } from './AddressDetails';
import { FinancialsDetails } from './FinancialsDetails';
import { UtilitiesDetails } from './UtilitiesDetails';
import { SupportDetails } from './SupportDetails';

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
  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

  if (!house) {
    return null;
  }

  const { address, financials, insurance, support, utilities } = house;

  return (
    <PageContent heading="House Details">
      <Tabs index={currentStep}>
        <TabList style={{ flexWrap: 'wrap' }}>
          <Tab onClick={setStep0}>Address</Tab>
          <Tab onClick={setStep1}>Financials</Tab>
          <Tab onClick={setStep2}>Utilities</Tab>
          <Tab onClick={setStep3}>Support</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AddressDetails data={address} />
          </TabPanel>
          <TabPanel>
            <FinancialsDetails data={{ financials, insurance }} />
          </TabPanel>
          <TabPanel>
            <UtilitiesDetails data={utilities} />
          </TabPanel>
          <TabPanel>
            <SupportDetails data={support} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  );
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